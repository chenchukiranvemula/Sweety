/* =========================================================
   CINEMATIC BIRTHDAY WEBSITE
   JAVASCRIPT
   ---------------------------------------------------------
   Keeps the existing content and adds:
   • Cinematic lock-screen opening
   • Date unlock animation
   • Rose transition
   • Gift effects
   • Cake candle/firework effects
   • Letter typing
   • Music controls
   • Floating hearts/petals
   • Chapter transitions
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const welcome = document.getElementById("welcome");
const website = document.getElementById("website");
const startBtn = document.getElementById("startBtn");

const chapters = document.querySelectorAll(".chapter");
const nextBtns = document.querySelectorAll(".nextBtn");

const bgMusic = document.getElementById("bgMusic");
const chapterSong = document.getElementById("chapter9Song");

const musicBtn = document.getElementById("musicBtn");
const cakeBtn = document.getElementById("cakeBtn");
const restartBtn = document.getElementById("restart");

const lockScreen = document.getElementById("lockScreen");
const dayPicker = document.getElementById("dayPicker");
const monthPicker = document.getElementById("monthPicker");
const yearPicker = document.getElementById("yearPicker");
const unlockBtn = document.getElementById("unlockBtn");
const chanceCount = document.getElementById("chanceCount");
const roseArea = document.getElementById("roseArea");
const timerArea = document.getElementById("timerArea");

let currentChapter = 0;
let attempts = 5;
let locked = false;

let heartInterval = null;
let celebrationInterval = null;


/* =========================================================
   INITIAL STATE
========================================================= */

window.addEventListener("load", () => {

    if (welcome) welcome.style.display = "flex";
    if (website) website.style.display = "none";
    if (lockScreen) lockScreen.style.display = "flex";

    createBackgroundStars();
    createBackgroundPetals();
    createLockPetals();

});


/* =========================================================
   DATE LOCK
========================================================= */

const PASSWORD = {
    day: 16,
    month: 9,
    year: 2024
};


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


/* =========================================================
   CREATE DATE OPTIONS
========================================================= */

if (dayPicker) {

    for (let i = 1; i <= 31; i++) {

        const option = document.createElement("option");

        option.value = i;
        option.textContent = i;

        dayPicker.appendChild(option);

    }

}


if (monthPicker) {

    months.forEach((month, index) => {

        const option = document.createElement("option");

        option.value = index + 1;
        option.textContent = month;

        monthPicker.appendChild(option);

    });

}


if (yearPicker) {

    for (let year = 1900; year <= 2100; year++) {

        const option = document.createElement("option");

        option.value = year;
        option.textContent = year;

        yearPicker.appendChild(option);

    }

}


/* =========================================================
   DEFAULT DATE
========================================================= */

if (dayPicker) dayPicker.value = 1;
if (monthPicker) monthPicker.value = 1;
if (yearPicker) yearPicker.value = 2024;


/* =========================================================
   DATE SELECT ANIMATION
========================================================= */

document
    .querySelectorAll("#dayPicker,#monthPicker,#yearPicker")
    .forEach(select => {

        select.addEventListener("change", () => {

            select.classList.add("selectedGlow");

            setTimeout(() => {
                select.classList.remove("selectedGlow");
            }, 500);

        });

    });


/* =========================================================
   UNLOCK BUTTON
========================================================= */

if (unlockBtn) {

    unlockBtn.addEventListener("click", () => {

        if (locked) return;

        const day = Number(dayPicker.value);
        const month = Number(monthPicker.value);
        const year = Number(yearPicker.value);

        if (
            day === PASSWORD.day &&
            month === PASSWORD.month &&
            year === PASSWORD.year
        ) {

            unlockLove();

        } else {

            wrongDate();

        }

    });

}


/* =========================================================
   WRONG DATE
========================================================= */

function wrongDate() {

    if (locked) return;

    vibratePhone();

    attempts--;

    if (chanceCount) {
        chanceCount.textContent = attempts;
    }


    const messages = [

        "🌹 Not this memory...",

        "🌸 Close your eyes... Remember any special date 💖",

        "❤️ Love always remembers... Try again.",

        "🌷 One last chance...Think about our proposal",

        "🥀 Too many wrong memories..."

    ];


    const index = Math.min(
        messages.length - 1,
        Math.max(0, 4 - attempts)
    );


    if (roseArea) {
        roseArea.textContent = messages[index];
    }


    const box = document.querySelector(".lockContainer");


    if (box) {

        box.animate(
            [
                { transform: "translateX(-12px)" },
                { transform: "translateX(12px)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 450,
                easing: "ease-in-out"
            }
        );

    }


    /* dramatic red/pink flash */

    if (lockScreen) {

        lockScreen.classList.add("wrongAttempt");

        setTimeout(() => {
            lockScreen.classList.remove("wrongAttempt");
        }, 500);

    }


    if (attempts <= 0) {

        startTimer();

    }

}


/* =========================================================
   LOCK TIMER
========================================================= */

function startTimer() {

    locked = true;

    if (unlockBtn) {
        unlockBtn.disabled = true;
    }


    let timeLeft = 60;


    if (timerArea) {
        timerArea.textContent =
            "Try again in " + timeLeft + " seconds";
    }


    const timer = setInterval(() => {

        timeLeft--;


        if (timerArea) {

            timerArea.textContent =
                "Try again in " + timeLeft + " seconds";

        }


        if (timeLeft <= 0) {

            clearInterval(timer);

            attempts = 5;


            if (chanceCount) {
                chanceCount.textContent = attempts;
            }


            if (unlockBtn) {
                unlockBtn.disabled = false;
            }


            if (timerArea) {
                timerArea.textContent = "";
            }


            if (roseArea) {
                roseArea.textContent = "";
            }


            locked = false;

        }

    }, 1000);

}


/* =========================================================
   PHONE VIBRATION
========================================================= */

function vibratePhone() {

    if (navigator.vibrate) {

        navigator.vibrate([
            100,
            80,
            100
        ]);

    }

}


/* =========================================================
   CINEMATIC UNLOCK
========================================================= */

function unlockLove() {

    locked = true;

    if (unlockBtn) {
        unlockBtn.disabled = true;
    }


    /* Heart unlock animation */

    playHeartUnlock();


    /* Rose explosion */

    setTimeout(() => {

        createRoseTransition();

    }, 1100);


    /* Screen cinematic transition */

    setTimeout(() => {

        if (lockScreen) {
            lockScreen.classList.add("unlockSuccess");
        }

    }, 2500);


    /* Move to welcome screen */

    setTimeout(() => {

        if (lockScreen) {

            lockScreen.style.display = "none";

            lockScreen.classList.remove(
                "unlockSuccess",
                "unlocking"
            );

        }


        if (welcome) {
            welcome.style.display = "flex";
        }


        if (website) {
            website.style.display = "none";
        }


        locked = false;

    }, 3700);

}


/* =========================================================
   HEART UNLOCK
========================================================= */

function playHeartUnlock() {

    if (!lockScreen) return;

    lockScreen.classList.add("unlocking");

    createLockHeartExplosion();

}


/* =========================================================
   HEART EXPLOSION
========================================================= */

function createLockHeartExplosion() {

    if (!lockScreen) return;

    const symbols = [
        "❤️",
        "💗",
        "🌹",
        "🌸"
    ];


    for (let i = 0; i < 45; i++) {

        setTimeout(() => {

            const item = document.createElement("div");

            item.className = "lockHeartParticle";

            item.textContent =
                symbols[
                    Math.floor(
                        Math.random() * symbols.length
                    )
                ];


            item.style.left = "50%";
            item.style.top = "50%";


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                100 +
                Math.random() * 350;


            item.style.setProperty(
                "--x",
                Math.cos(angle) * distance + "px"
            );


            item.style.setProperty(
                "--y",
                Math.sin(angle) * distance + "px"
            );


            lockScreen.appendChild(item);


            setTimeout(() => {
                item.remove();
            }, 1800);

        }, i * 18);

    }

}


/* =========================================================
   ROSE TRANSITION
========================================================= */

function createRoseTransition() {

    const transition =
        document.getElementById("roseTransition");


    const burst =
        document.getElementById("roseBurst");


    if (!transition || !burst) return;


    transition.classList.add("active");


    const flowers = [
        "🌹",
        "🌸",
        "🌷",
        "❤️"
    ];


    for (let i = 0; i < 95; i++) {

        setTimeout(() => {

            const rose =
                document.createElement("div");


            rose.className =
                "cinematicRose";


            rose.textContent =
                flowers[
                    Math.floor(
                        Math.random() *
                        flowers.length
                    )
                ];


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                120 +
                Math.random() * 620;


            rose.style.setProperty(
                "--rx",
                Math.cos(angle) *
                distance +
                "px"
            );


            rose.style.setProperty(
                "--ry",
                Math.sin(angle) *
                distance +
                "px"
            );


            rose.style.setProperty(
                "--rs",
                (
                    0.55 +
                    Math.random() * 1.5
                ).toFixed(2)
            );


            rose.style.setProperty(
                "--rr",
                (
                    Math.random() *
                    720 -
                    360
                ) + "deg"
            );


            rose.style.animationDelay =
                Math.random() * 0.35 +
                "s";


            burst.appendChild(rose);


            setTimeout(() => {

                rose.remove();

            }, 3400);

        }, i * 14);

    }


    setTimeout(() => {

        transition.classList.remove("active");

    }, 3500);

}


/* =========================================================
   START WEBSITE
========================================================= */

if (startBtn) {

    startBtn.addEventListener("click", () => {

        if (welcome) {
            welcome.style.display = "none";
        }


        if (website) {
            website.style.display = "block";
        }


        chapters.forEach(chapter => {

            chapter.classList.remove("active");

        });


        currentChapter = 0;


        if (chapters[currentChapter]) {

            chapters[currentChapter]
                .classList
                .add("active");

        }


        /* background music */

        if (bgMusic) {

            bgMusic
                .play()
                .catch(() => {});

        }


        startHearts();

    });

}


/* =========================================================
   CHAPTER NAVIGATION
========================================================= */

nextBtns.forEach(button => {

    button.addEventListener("click", () => {

        /* stop special song when leaving chapter */

        if (currentChapter === 8) {

            stopChapterSong();

        }


        if (chapters[currentChapter]) {

            chapters[currentChapter]
                .classList
                .remove("active");

        }


        currentChapter++;


        if (currentChapter >= chapters.length) {

            currentChapter =
                chapters.length - 1;

        }


        if (chapters[currentChapter]) {

            chapters[currentChapter]
                .classList
                .add("active");

        }


        /* chapter 10 */

        if (currentChapter === 9) {

            startCelebration();

        } else {

            stopCelebration();

        }


        /* cake chapter */

        if (currentChapter === 6) {

            resetCake();

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        createChapterTransition();

    });

});


/* =========================================================
   CHAPTER TRANSITION
========================================================= */

function createChapterTransition() {

    const overlay =
        document.createElement("div");


    overlay.className =
        "chapterTransition";


    document.body.appendChild(overlay);


    setTimeout(() => {

        overlay.classList.add("show");

    }, 10);


    setTimeout(() => {

        overlay.classList.remove("show");

    }, 350);


    setTimeout(() => {

        overlay.remove();

    }, 700);

}


/* =========================================================
   GIFTS
========================================================= */

const gifts =
    document.querySelectorAll(".gift");


const giftMessage =
    document.getElementById("giftMessage");


gifts.forEach(gift => {

    gift.addEventListener("click", () => {

        gifts.forEach(item => {

            item.classList.remove("open");

        });


        gift.classList.add("open");


        const message =
            gift.dataset.message || "";


        if (!giftMessage) return;


        giftMessage.textContent = "";


        let i = 0;


        function typeGift() {

            if (i < message.length) {

                giftMessage.textContent +=
                    message.charAt(i);


                i++;


                setTimeout(
                    typeGift,
                    40
                );

            }

        }


        typeGift();


        createBurstAtElement(
            gift,
            [
                "❤️",
                "✨",
                "🌸"
            ],
            18
        );


        /* cinematic glow */

        gift.classList.add("giftCinematicOpen");


        setTimeout(() => {

            gift.classList.remove(
                "giftCinematicOpen"
            );

        }, 1000);

    });

});


/* =========================================================
   REALISTIC CAKE
========================================================= */

let cakeFinished = false;


if (cakeBtn) {

    cakeBtn.addEventListener("click", () => {

        if (cakeFinished) return;


        cakeFinished = true;


        const cake =
            document.getElementById("realCake");


        const wish =
            document.getElementById("wishReveal");


        if (cake) {

            cake.classList.add(
                "candlesOut"
            );

        }


        /* candle smoke */

        createCandleSmoke();


        /* fireworks */

        createCakeFireworks();


        /* birthday wish */

        if (wish) {

            wish.textContent =
                "🎂 Happy Birthday Ammadu ❤️";


            wish.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "translateY(15px) scale(.8)"
                    },
                    {
                        opacity: 1,
                        transform:
                            "translateY(0) scale(1)"
                    }
                ],
                {
                    duration: 900,
                    easing: "ease-out"
                }
            );

        }


        /* cake bounce */

        if (cake) {

            cake.animate(
                [
                    {
                        transform:
                            "scale(.95)"
                    },
                    {
                        transform:
                            "scale(1.05)"
                    },
                    {
                        transform:
                            "scale(1)"
                    }
                ],
                {
                    duration: 800,
                    easing: "ease-out"
                }
            );

        }


        /* screen celebration */

        document.body.classList.add(
            "cakeCelebration"
        );


        setTimeout(() => {

            document.body.classList.remove(
                "cakeCelebration"
            );

        }, 2500);

    });

}


/* =========================================================
   RESET CAKE
========================================================= */

function resetCake() {

    cakeFinished = false;


    const cake =
        document.getElementById("realCake");


    const wish =
        document.getElementById("wishReveal");


    if (cake) {

        cake.classList.remove(
            "candlesOut"
        );

    }


    if (wish) {

        wish.textContent = "";

    }

}


/* =========================================================
   CANDLE SMOKE
========================================================= */

function createCandleSmoke() {

    const candles =
        document.querySelectorAll(
            ".candle"
        );


    candles.forEach((candle, index) => {

        setTimeout(() => {

            const rect =
                candle.getBoundingClientRect();


            for (let i = 0; i < 5; i++) {

                const smoke =
                    document.createElement("div");


                smoke.className =
                    "candleSmoke";


                smoke.style.left =
                    rect.left +
                    rect.width / 2 +
                    "px";


                smoke.style.top =
                    rect.top +
                    "px";


                document.body.appendChild(
                    smoke
                );


                smoke.animate(
                    [
                        {
                            transform:
                                "translate(-50%,0) scale(.5)",
                            opacity: .7
                        },
                        {
                            transform:
                                "translate(calc(-50% + 10px),-70px) scale(1.4)",
                            opacity: 0
                        }
                    ],
                    {
                        duration:
                            1400 +
                            Math.random() * 500,
                        easing:
                            "ease-out"
                    }
                );


                setTimeout(() => {

                    smoke.remove();

                }, 2000);

            }

        }, index * 100);

    });

}


/* =========================================================
   CAKE FIREWORKS
========================================================= */

function createCakeFireworks() {

    const symbols = [
        "✨",
        "❤️",
        "🌸",
        "🎉",
        "🎆"
    ];


    for (let wave = 0; wave < 3; wave++) {

        setTimeout(() => {

            for (let i = 0; i < 65; i++) {

                const spark =
                    document.createElement("div");


                spark.className =
                    "cakeSpark";


                spark.textContent =
                    symbols[
                        Math.floor(
                            Math.random() *
                            symbols.length
                        )
                    ];


                spark.style.left =
                    "50vw";


                spark.style.top =
                    "45vh";


                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const distance =
                    80 +
                    Math.random() *
                    420;


                spark.style.setProperty(
                    "--x",
                    Math.cos(angle) *
                    distance +
                    "px"
                );


                spark.style.setProperty(
                    "--y",
                    Math.sin(angle) *
                    distance +
                    "px"
                );


                document.body.appendChild(
                    spark
                );


                setTimeout(() => {

                    spark.remove();

                }, 1600);

            }

        }, wave * 350);

    }

}


/* =========================================================
   LOVE LETTER
========================================================= */

const envelope =
    document.getElementById(
        "openLetter"
    );


const letterBox =
    document.getElementById(
        "letterBox"
    );


const letterText =
    document.getElementById(
        "letterText"
    );


let fullLetter = "";


if (letterText) {

    fullLetter =
        letterText.innerText;


    letterText.innerHTML = "";

}


/* =========================================================
   LETTER TYPING
========================================================= */

function typeLetter() {

    if (!letterText) return;


    let i = 0;


    function type() {

        if (i < fullLetter.length) {

            letterText.innerHTML =
                fullLetter.substring(
                    0,
                    i + 1
                ) +
                '<span class="cursor">|</span>';


            i++;


            createHeart();


            setTimeout(
                type,
                35
            );

        } else {

            letterText.innerHTML =
                fullLetter +
                '<span class="cursor">|</span>';

        }

    }


    type();

}


/* =========================================================
   OPEN LETTER
========================================================= */

if (envelope) {

    envelope.addEventListener(
        "click",
        () => {

            envelope.animate(
                [
                    {
                        transform:
                            "scale(1) rotateX(0deg)",
                        opacity: 1
                    },
                    {
                        transform:
                            "scale(.7) rotateX(-90deg)",
                        opacity: 0
                    }
                ],
                {
                    duration: 550,
                    fill: "forwards",
                    easing: "ease-in-out"
                }
            );


            setTimeout(() => {

                if (envelope.parentElement) {

                    envelope.parentElement.style.display =
                        "none";

                }


                if (letterBox) {

                    letterBox.style.display =
                        "block";


                    setTimeout(() => {

                        letterBox.classList.add(
                            "show"
                        );


                        typeLetter();

                    }, 150);

                }

            }, 550);

        }
    );

}


/* =========================================================
   TYPING HEARTS
========================================================= */

function createHeart() {

    const heart =
        document.createElement("div");


    heart.className =
        "typingHeart";


    heart.textContent = "❤️";


    heart.style.left =
        40 +
        Math.random() * 20 +
        "vw";


    document.body.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, 2500);

}


/* =========================================================
   MUSIC
========================================================= */

const vinyl =
    document.getElementById(
        "vinyl"
    );


if (musicBtn) {

    musicBtn.addEventListener(
        "click",
        () => {

            if (!chapterSong) return;


            if (chapterSong.paused) {

                if (bgMusic) {
                    bgMusic.pause();
                }


                chapterSong.currentTime = 0;


                chapterSong
                    .play()
                    .catch(() => {});


                if (vinyl) {

                    vinyl.classList.add(
                        "spin"
                    );

                }


                musicBtn.textContent =
                    "⏸ Pause Song";


                const player =
                    document.querySelector(
                        ".musicPlayer"
                    );


                if (player) {

                    player.classList.add(
                        "playing"
                    );

                }


                startMusicEffects();

            } else {

                stopChapterSong();

            }

        }
    );

}


/* =========================================================
   STOP CHAPTER SONG
========================================================= */

function stopChapterSong() {

    if (!chapterSong) return;


    chapterSong.pause();


    chapterSong.currentTime = 0;


    if (bgMusic) {

        bgMusic
            .play()
            .catch(() => {});

    }


    if (vinyl) {

        vinyl.classList.remove(
            "spin"
        );

    }


    if (musicBtn) {

        musicBtn.textContent =
            "▶ Play The Song";

    }


    const player =
        document.querySelector(
            ".musicPlayer"
        );


    if (player) {

        player.classList.remove(
            "playing"
        );

    }

}


/* =========================================================
   SONG ENDED
========================================================= */

if (chapterSong) {

    chapterSong.addEventListener(
        "ended",
        () => {

            if (vinyl) {

                vinyl.classList.remove(
                    "spin"
                );

            }


            const player =
                document.querySelector(
                    ".musicPlayer"
                );


            if (player) {

                player.classList.remove(
                    "playing"
                );

            }


            if (bgMusic) {

                bgMusic
                    .play()
                    .catch(() => {});

            }


            if (musicBtn) {

                musicBtn.textContent =
                    "▶ Play The Song ❤️";

            }

        }
    );

}


/* =========================================================
   MUSIC FLOATING NOTES
========================================================= */

function startMusicEffects() {

    for (let i = 0; i < 35; i++) {

        setTimeout(() => {

            const note =
                document.createElement("div");


            note.textContent =
                Math.random() > .5
                    ? "🎵"
                    : "🎶";


            note.style.position =
                "fixed";


            note.style.left =
                Math.random() *
                100 +
                "vw";


            note.style.top =
                "100vh";


            note.style.fontSize =
                15 +
                Math.random() *
                20 +
                "px";


            note.style.pointerEvents =
                "none";


            note.style.zIndex =
                "9999";


            document.body.appendChild(
                note
            );


            note.animate(
                [
                    {
                        transform:
                            "translateY(0) rotate(0)",
                        opacity: 0
                    },
                    {
                        transform:
                            "translateY(-50vh) rotate(20deg)",
                        opacity: 1
                    },
                    {
                        transform:
                            "translateY(-105vh) rotate(-20deg)",
                        opacity: 0
                    }
                ],
                {
                    duration: 4200,
                    easing: "ease-out"
                }
            );


            setTimeout(() => {

                note.remove();

            }, 4300);

        }, i * 120);

    }

}


/* =========================================================
   FLOATING HEARTS
========================================================= */

function startHearts() {

    clearInterval(
        heartInterval
    );


    heartInterval =
        setInterval(() => {

            const heart =
                document.createElement(
                    "div"
                );


            heart.className =
                "heart";


            heart.textContent =
                Math.random() > .5
                    ? "❤️"
                    : "💗";


            heart.style.position =
                "fixed";


            heart.style.left =
                Math.random() *
                100 +
                "vw";


            heart.style.bottom =
                "-30px";


            heart.style.fontSize =
                14 +
                Math.random() *
                20 +
                "px";


            heart.style.pointerEvents =
                "none";


            heart.style.zIndex =
                "2";


            heart.animate(
                [
                    {
                        transform:
                            "translateY(0) rotate(0)",
                        opacity: 0
                    },
                    {
                        transform:
                            "translateY(-45vh) rotate(120deg)",
                        opacity: .65
                    },
                    {
                        transform:
                            "translateY(-110vh) rotate(300deg)",
                        opacity: 0
                    }
                ],
                {
                    duration: 7000,
                    easing: "linear"
                }
            );


            document.body.appendChild(
                heart
            );


            setTimeout(() => {

                heart.remove();

            }, 7200);


        }, 900);

}


/* =========================================================
   CHAPTER 10 CELEBRATION
========================================================= */

function startCelebration() {

    stopCelebration();


    const icons = [
        "🎈",
        "🎊",
        "🎉",
        "✨",
        "❤️",
        "🌸"
    ];


    celebrationInterval =
        setInterval(() => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "partyItem";


            item.textContent =
                icons[
                    Math.floor(
                        Math.random() *
                        icons.length
                    )
                ];


            item.style.left =
                Math.random() *
                100 +
                "vw";


            item.style.fontSize =
                20 +
                Math.random() *
                30 +
                "px";


            document.body.appendChild(
                item
            );


            setTimeout(() => {

                item.remove();

            }, 4200);


        }, 180);


    createCelebrationFireworks();

}


/* =========================================================
   STOP CELEBRATION
========================================================= */

function stopCelebration() {

    clearInterval(
        celebrationInterval
    );


    document
        .querySelectorAll(
            ".partyItem,.celebrationSpark"
        )
        .forEach(element => {

            element.remove();

        });

}


/* =========================================================
   CELEBRATION FIREWORKS
========================================================= */

function createCelebrationFireworks() {

    for (let wave = 0; wave < 6; wave++) {

        setTimeout(() => {

            const cx =
                15 +
                Math.random() *
                70;


            const cy =
                20 +
                Math.random() *
                35;


            for (let i = 0; i < 45; i++) {

                const spark =
                    document.createElement(
                        "div"
                    );


                spark.className =
                    "celebrationSpark";


                spark.style.left =
                    cx + "vw";


                spark.style.top =
                    cy + "vh";


                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const distance =
                    70 +
                    Math.random() *
                    240;


                spark.style.setProperty(
                    "--x",
                    Math.cos(angle) *
                    distance +
                    "px"
                );


                spark.style.setProperty(
                    "--y",
                    Math.sin(angle) *
                    distance +
                    "px"
                );


                document.body.appendChild(
                    spark
                );


                setTimeout(() => {

                    spark.remove();

                }, 1600);

            }

        }, wave * 450);

    }

}


/* =========================================================
   CARD / PHOTO / TIMEBOX EFFECTS
========================================================= */

document
    .querySelectorAll(
        ".card,.timeBox,.gift,.photo"
    )
    .forEach(box => {

        box.addEventListener(
            "click",
            () => {

                createBurstAtElement(
                    box,
                    [
                        "❤️",
                        "✨"
                    ],
                    8
                );

            }
        );

    });


/* =========================================================
   ELEMENT BURST
========================================================= */

function createBurstAtElement(
    element,
    symbols,
    count
) {

    if (!element) return;


    const rect =
        element.getBoundingClientRect();


    for (let i = 0; i < count; i++) {

        const particle =
            document.createElement(
                "div"
            );


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.position =
            "fixed";


        particle.style.left =
            rect.left +
            rect.width / 2 +
            "px";


        particle.style.top =
            rect.top +
            rect.height / 2 +
            "px";


        particle.style.zIndex =
            "99999";


        particle.style.pointerEvents =
            "none";


        particle.style.fontSize =
            14 +
            Math.random() *
            14 +
            "px";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            50 +
            Math.random() *
            120;


        document.body.appendChild(
            particle
        );


        particle.animate(
            [
                {
                    transform:
                        "translate(-50%,-50%) scale(.3)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${Math.cos(angle) * distance}px),
                            calc(-50% + ${Math.sin(angle) * distance}px)
                        )
                        scale(1.2)`,
                    opacity: 0
                }
            ],
            {
                duration: 900,
                easing: "ease-out"
            }
        );


        setTimeout(() => {

            particle.remove();

        }, 950);

    }

}


/* =========================================================
   RESTART
========================================================= */

if (restartBtn) {

    restartBtn.addEventListener(
        "click",
        () => {

            location.reload();

        }
    );

}


/* =========================================================
   BACKGROUND STARS
========================================================= */

function createBackgroundStars() {

    setInterval(() => {

        if (
            lockScreen &&
            lockScreen.style.display !== "none"
        ) {

            return;

        }


        const star =
            document.createElement(
                "div"
            );


        star.style.position =
            "fixed";


        star.style.width =
            "2px";


        star.style.height =
            "2px";


        star.style.borderRadius =
            "50%";


        star.style.background =
            "rgba(255,220,240,.8)";


        star.style.left =
            Math.random() *
            100 +
            "vw";


        star.style.top =
            Math.random() *
            100 +
            "vh";


        star.style.pointerEvents =
            "none";


        star.style.zIndex =
            "0";


        star.animate(
            [
                {
                    opacity: .1,
                    transform:
                        "scale(.5)"
                },
                {
                    opacity: 1,
                    transform:
                        "scale(1.8)"
                },
                {
                    opacity: 0,
                    transform:
                        "scale(.5)"
                }
            ],
            {
                duration: 2600
            }
        );


        document.body.appendChild(
            star
        );


        setTimeout(() => {

            star.remove();

        }, 2700);


    }, 320);

}


/* =========================================================
   BACKGROUND PETALS
========================================================= */

function createBackgroundPetals() {

    setInterval(() => {

        if (
            lockScreen &&
            lockScreen.style.display !== "none"
        ) {

            return;

        }


        const petal =
            document.createElement(
                "div"
            );


        petal.textContent =
            Math.random() > .45
                ? "🌸"
                : "🌹";


        petal.style.position =
            "fixed";


        petal.style.left =
            Math.random() *
            100 +
            "vw";


        petal.style.top =
            "-35px";


        petal.style.fontSize =
            14 +
            Math.random() *
            16 +
            "px";


        petal.style.pointerEvents =
            "none";


        petal.style.zIndex =
            "1";


        petal.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0)",
                    opacity: 0
                },
                {
                    transform:
                        "translateY(50vh) translateX(70px) rotate(180deg)",
                    opacity: .6
                },
                {
                    transform:
                        "translateY(110vh) translateX(-50px) rotate(360deg)",
                    opacity: 0
                }
            ],
            {
                duration: 8500,
                easing: "linear"
            }
        );


        document.body.appendChild(
            petal
        );


        setTimeout(() => {

            petal.remove();

        }, 8600);


    }, 1100);

}


/* =========================================================
   LOCK SCREEN PETALS
========================================================= */

function createLockPetals() {

    const layer =
        document.getElementById(
            "lockPetalLayer"
        );


    if (!layer) return;


    setInterval(() => {

        if (
            lockScreen &&
            lockScreen.style.display === "none"
        ) {

            return;

        }


        const petal =
            document.createElement(
                "div"
            );


        petal.textContent =
            Math.random() > .5
                ? "🌹"
                : "🌸";


        petal.style.position =
            "absolute";


        petal.style.left =
            Math.random() *
            100 +
            "%";


        petal.style.top =
            "-30px";


        petal.style.fontSize =
            14 +
            Math.random() *
            14 +
            "px";


        petal.style.pointerEvents =
            "none";


        petal.style.opacity =
            ".65";


        petal.animate(
            [
                {
                    transform:
                        "translate(0,0) rotate(0)",
                    opacity: 0
                },
                {
                    transform:
                        "translate(70px,50vh) rotate(180deg)",
                    opacity: .7
                },
                {
                    transform:
                        "translate(-60px,110vh) rotate(360deg)",
                    opacity: 0
                }
            ],
            {
                duration: 9000,
                easing: "linear"
            }
        );


        layer.appendChild(
            petal
        );


        setTimeout(() => {

            petal.remove();

        }, 9100);


    }, 1000);

}


/* =========================================================
   PREVENT DOUBLE MUSIC
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            chapterSong &&
            !chapterSong.paused
        ) {

            chapterSong.pause();

        }

    }
);


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /* Enter = unlock */

        if (
            event.key === "Enter" &&
            lockScreen &&
            lockScreen.style.display !== "none"
        ) {

            if (unlockBtn) {

                unlockBtn.click();

            }

        }


        /* Escape = stop special song */

        if (event.key === "Escape") {

            stopChapterSong();

        }

    }
);


/* =========================================================
   TOUCH FEEDBACK
========================================================= */

document.addEventListener(
    "touchstart",
    event => {

        const target =
            event.target.closest(
                ".gift,.card,.photo,.timeBox"
            );


        if (!target) return;


        createBurstAtElement(
            target,
            [
                "❤️",
                "✨"
            ],
            5
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   FINAL CINEMATIC EFFECT
========================================================= */

function finalCinematicEffect() {

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "finalCinematicOverlay";


    document.body.appendChild(
        overlay
    );


    requestAnimationFrame(() => {

        overlay.classList.add(
            "active"
        );

    });


    setTimeout(() => {

        overlay.classList.remove(
            "active"
        );

    }, 1200);


    setTimeout(() => {

        overlay.remove();

    }, 1800);

}


/* =========================================================
   OBSERVE CHAPTER CHANGES
========================================================= */

if (chapters.length) {

    chapters.forEach((chapter, index) => {

        const observer =
            new MutationObserver(() => {

                if (
                    chapter.classList.contains(
                        "active"
                    )
                ) {

                    if (
                        index ===
                        chapters.length - 1
                    ) {

                        finalCinematicEffect();

                    }

                }

            });


        observer.observe(
            chapter,
            {
                attributes: true,
                attributeFilter: [
                    "class"
                ]
            }
        );

    });

}


/* =========================================================
   END
========================================================= */
