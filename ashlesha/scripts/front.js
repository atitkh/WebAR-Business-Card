const showButtons = () => {
    let y = 0;
    const phoneButton = document.querySelector("#phone-button");
    const webButton = document.querySelector("#web-button");
    const emailButton = document.querySelector("#email-button");
    const locationButton = document.querySelector("#location-button");

    emailButton.setAttribute("visible", true);
    setTimeout(() => {
        webButton.setAttribute("visible", true);
    }, 300);
    setTimeout(() => {
        phoneButton.setAttribute("visible", true);
    }, 600);
    setTimeout(() => {
        locationButton.setAttribute("visible", true);
    }, 900);

    webButton.addEventListener('click', function (evt) {
        window.open("https://www.kerkarcreations.com/", '_blank');
    });
    emailButton.addEventListener('click', function (evt) {
        window.location.href = "mailto: ashlesha@kerkarcreations.com";
    });
    phoneButton.addEventListener('click', function (evt) {
        window.location.href = "tel:+9779860913806";
    });
    locationButton.addEventListener('click', function (evt) {
        window.open("https://www.google.com/maps/place/Kathmandu+44600/", '_blank');
    });
}

const animateLogo = (onDone) => {
    const logo = document.querySelector("#cardLogo");
    let y = -0.4;
    logo.setAttribute("visible", true);
    const id = setInterval(() => {
        y += 0.008;
        if (y >= 0) {
            clearInterval(id);
            onDone();
        }
        logo.setAttribute("position", "0 " + y + " 0.01");
    }, 15);
}

const animateBorders = (onDone) => {
    const topBorder = document.querySelector("#cardTopBorder");
    const bottomBorder = document.querySelector("#cardBotBorder");
    const siteText = document.querySelector("#cardSiteText");
    let xt = 0.4;
    let xb = -0.4;
    topBorder.setAttribute("visible", true);
    bottomBorder.setAttribute("visible", true);
    const id = setInterval(() => {
        xt -= 0.008;
        xb += 0.008;

        if (xt <= 0) {
            clearInterval(id);
            onDone();
        }
        if (xb >= 0) {
            clearInterval(id);
            onDone();
        }
        topBorder.setAttribute("position", xt + " 0 0.01");
        bottomBorder.setAttribute("position", xb + " 0 0.01");
    }, 15);
    siteText.setAttribute("position", "0 0 0.01");
    siteText.setAttribute("visible", true);
}

const showPortfolio = () => {
    const portfolio = document.querySelector("#portfolio-panel");
    const portfolioLeftButton = document.querySelector("#portfolio-left-button");
    const portfolioRightButton = document.querySelector("#portfolio-right-button");

    let y = 0;
    let currentItem = 0;

    portfolio.setAttribute("visible", true);

    const showPortfolioItem = (item) => {
        const testVideo = document.createElement("video");
        const canplayWebm = testVideo.canPlayType('video/webm; codecs="vp8, vorbis"');
        for (let i = 0; i <= 2; i++) {
            if (i === item) {
                if (canplayWebm == "") {
                    document.querySelector("#portfolio-video-link").setAttribute("src", "#portfolio"+i+"-video-mp4");
                    document.querySelector("#portfolio"+i+"-video-mp4").play();
                } else {
                    document.querySelector("#portfolio-video-link").setAttribute("src", "#portfolio"+i+"-video-webm");
                    document.querySelector("#portfolio"+i+"-video-webm").play();
                }
            }
            else{
                document.querySelector("#portfolio"+i+"-video-mp4").pause();
                document.querySelector("#portfolio"+i+"-video-webm").pause();
            }
        }
    }
    const id = setInterval(() => {
        y += 0.008;
        if (y >= 0.8) {
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

            showPortfolioItem(0);
        }
        portfolio.setAttribute("position", "0 " + y + " -0.01");
    }, 10);
}

const resetComponents = () => {
    const logo = document.querySelector("#cardLogo");
    const topBorder = document.querySelector("#cardTopBorder");
    const bottomBorder = document.querySelector("#cardBotBorder");
    const siteText = document.querySelector("#cardSiteText");
    const phoneButton = document.querySelector("#phone-button");
    const webButton = document.querySelector("#web-button");
    const emailButton = document.querySelector("#email-button");
    const locationButton = document.querySelector("#location-button");
    const text = document.querySelector("#text");
    const portfolio = document.querySelector("#portfolio-panel");

    portfolio.setAttribute("visible", false);
    portfolio.setAttribute("position", "0 0 -0.01");

    logo.setAttribute("visible", false);
    logo.setAttribute("position", "0 -0.4 0.01");

    topBorder.setAttribute("visible", false);
    topBorder.setAttribute("position", "0.4 0 0.01");

    bottomBorder.setAttribute("visible", false);
    bottomBorder.setAttribute("position", "-0.4 0 0.01");

    siteText.setAttribute("visible", false);
    siteText.setAttribute("position", "0 0 0.01");

    phoneButton.setAttribute("visible", false);
    webButton.setAttribute("visible", false);
    emailButton.setAttribute("visible", false);
    locationButton.setAttribute("visible", false);
    text.setAttribute("visible", false);

    for(let i = 0; i <= 2; i++){
        document.querySelector("#portfolio"+i+"-video-mp4").pause();
        document.querySelector("#portfolio"+i+"-video-webm").pause();
    }
}

AFRAME.registerComponent('mytarget-front', {
    init: function () {
        this.el.addEventListener('targetFound', event => {
            console.log("target found");
            animateLogo(() => {
                setTimeout(() => {
                    animateBorders(showButtons);
                    setTimeout(() => {
                        showPortfolio();
                    }, 300);
                }, 200);
            });
        });
        this.el.addEventListener('targetLost', event => {
            console.log("target lost");
            resetComponents();
        });
        //this.el.emit('targetFound');
    }
});


resetComponents();