document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Бургер-меню ---
    const burgerBtn = document.getElementById('burger');
    const navMenu = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('is-active');
        navMenu.classList.toggle('is-active');
        document.body.style.overflow = navMenu.classList.contains('is-active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('is-active');
            navMenu.classList.remove('is-active');
            document.body.style.overflow = '';
        });
    });

    // --- 2. Табы (Железо) ---
    const tabBtns = document.querySelectorAll('.tabs__btn');
    const tabPanes = document.querySelectorAll('.tabs__pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('is-active'));
            tabPanes.forEach(p => p.classList.remove('is-active'));

            btn.classList.add('is-active');
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.classList.add('is-active');
        });
    });

    // --- 3. Форма и Модальное окно ---
    const form = document.getElementById('bookingForm');
    const phoneInput = document.getElementById('phone');
    const modal = document.getElementById('successModal');
    const closeModalBtns = document.querySelectorAll('#closeModal, #modalOkBtn');
    const modalNameSpan = document.getElementById('modalName');

    // Маска телефона
    phoneInput.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        if (!x[2]) {
            e.target.value = x[1] === '7' || x[1] === '8' ? '+7' : (x[1] ? '+' + x[1] : '');
            return;
        }
        e.target.value = !x[3] ? `+7 (${x[2]}` : `+7 (${x[2]}) ${x[3]}` + (x[4] ? `-${x[4]}` : '') + (x[5] ? `-${x[5]}` : '');
    });

    // Валидация и отправка
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const rawPhone = phoneInput.value.replace(/\D/g, '');
        if (rawPhone.length < 11) {
            phoneInput.classList.add('is-invalid');
            return;
        } else {
            phoneInput.classList.remove('is-invalid');
        }

        const userName = document.getElementById('name').value;
        modalNameSpan.textContent = userName;
        modal.classList.add('is-active');
        form.reset();
    });

    // Закрытие модалки
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => modal.classList.remove('is-active'));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('is-active');
    });
});
