window.addEventListener('load', function() {
    setBodyLoaded();
    setGoodsBlockLoaded();
    initSubscribeForm();
});

function setBodyLoaded() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('loaded');
}

function setGoodsBlockLoaded() {
    let reached = false;
    const GOODS_BLOCK_OFFSET = 300;
    const goodsBlock = document.getElementById('goodsBlock');
    const goodsBlockOffset = goodsBlock.offsetTop;
    const windowHeight = window.innerHeight;

    window.addEventListener('scroll', function() {
        let scrolled = window.pageYOffset;
        if (scrolled + windowHeight > goodsBlockOffset + GOODS_BLOCK_OFFSET) {
            if (!reached) {
                goodsBlock.classList.add('goods_block_loaded');
                reached = true;
            }
        }
    })
}

function initSubscribeForm() {
    const form = document.getElementById('subscribeForm');
    if (!form) return;

    const input = form.querySelector('.subscribe_input');
    const message = document.getElementById('subscribeMessage');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = input.value.trim();

        if (!emailRegex.test(email)) {
            message.textContent = 'Пожалуйста, введите корректный email';
            message.classList.add('error');
            input.focus();
            return;
        }

        message.textContent = 'Спасибо! Вы подписаны на новости.';
        message.classList.remove('error');
        form.reset();
    });

    input.addEventListener('input', function() {
        if (message.classList.contains('error')) {
            message.textContent = '';
            message.classList.remove('error');
        }
    });
}