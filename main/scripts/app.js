const showInfo = () => {
    let y = 0;
    const profileButton = document.querySelector("#profile-button");
    const webButton = document.querySelector("#web-button");
    const emailButton = document.querySelector("#email-button");
    const locationButton = document.querySelector("#location-button");
    const text = document.querySelector("#text");

    profileButton.setAttribute("visible", true);
    setTimeout(() => {
    webButton.setAttribute("visible", true);
    }, 300);
    setTimeout(() => {
    emailButton.setAttribute("visible", true);
    }, 600);
    setTimeout(() => {
    locationButton.setAttribute("visible", true);
    }, 900);

    let currentTab = '';
    webButton.addEventListener('click', function (evt) {
    window.open("https://www.kerkarcreations.com/", '_blank');
    currentTab = 'web';
    });
    emailButton.addEventListener('click', function (evt) {
    window.location.href="mailto: contact@kerkarcreations.com";
    currentTab = 'email';
    });
    profileButton.addEventListener('click', function (evt) {
    window.location.href="tel:+9779860851205";
    currentTab = 'profile';
    });
    locationButton.addEventListener('click', function (evt) {
    window.open("https://www.google.com/maps/place/Kathmandu+44600/", '_blank');
    currentTab = 'location';
    });
}

const showPortfolio = (done) => {
    const portfolio = document.querySelector("#portfolio-panel");
    const portfolioLeftButton = document.querySelector("#portfolio-left-button");
    const portfolioRightButton = document.querySelector("#portfolio-right-button");
    const paintandquestPreviewButton = document.querySelector("#paintandquest-preview-button");

    let y = 0;
    let currentItem = 0;

    portfolio.setAttribute("visible", true);

    const showPortfolioItem = (item) => {
    for (let i = 0; i <= 2; i++) {
        document.querySelector("#portfolio-item" + i).setAttribute("visible", i === item);
    }
    }
    const id = setInterval(() => {
    y += 0.008;
    if (y >= 0.6) {
        clearInterval(id);
        portfolioLeftButton.setAttribute("visible", true);
        portfolioRightButton.setAttribute("visible", true);
        portfolioLeftButton.addEventListener('click', () => {
        currentItem = (currentItem + 1) % 3;
        showPortfolioItem(currentItem);
        });
        portfolioRightButton.addEventListener('click', () => {
        currentItem = (currentItem - 1 + 3) % 3;
        showPortfolioItem(currentItem);
        });

        paintandquestPreviewButton.addEventListener('click', () => {
        paintandquestPreviewButton.setAttribute("visible", false);
        const testVideo = document.createElement( "video" );
        const canplayWebm = testVideo.canPlayType( 'video/webm; codecs="vp8, vorbis"' );
        if (canplayWebm == "") {
            document.querySelector("#paintandquest-video-link").setAttribute("src", "#paintandquest-video-mp4");
            document.querySelector("#paintandquest-video-mp4").play();
        } else {
            document.querySelector("#paintandquest-video-link").setAttribute("src", "#paintandquest-video-webm");
            document.querySelector("#paintandquest-video-webm").play();
        }
        });

        setTimeout(() => {
        done();
        }, 500);
    }
    portfolio.setAttribute("position", "0 " + y + " -0.01");
    }, 10);
}

const showAvatar = (onDone) => {
    const avatar = document.querySelector("#avatar");
    let z = -0.3;
    const id = setInterval(() => {
    z += 0.008;
    if (z >= 0.3) {
        clearInterval(id);
        onDone();
    }
    avatar.setAttribute("position", "0 -0.25 " + z);
    }, 10);
}

AFRAME.registerComponent('mytarget', {
    init: function () {
    this.el.addEventListener('targetFound', event => {
        console.log("target found");
        showAvatar(() => {
        setTimeout(() => {
            showPortfolio(() => {
            setTimeout(() => {
                showInfo();
            }, 300);
            });
        }, 300);
        });
    });
    this.el.addEventListener('targetLost', event => {
        console.log("target lost");
    });
    //this.el.emit('targetFound');
    }
});