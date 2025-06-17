const characters = [
    "©",
    "®",
    "™",
    "¶",
    "§",
    "•",
    "…",
    "–",
    "—",
    "¿",
    "¡",
    "¤",
    "$",
    "¢",
    "£",
    "¥",
    "₧",
    "₣",
    "±",
    "÷",
    "×",
    "≈",
    "≠",
    "≤",
    "≥",
    "√",
    "∞",
    "á",
    "é",
    "í",
    "ó",
    "ú",
    "ñ",
    "ç",
    "ä",
    "ë",
    "ï",
    "ö",
    "ü",
    "ÿ",
    "à",
    "è",
    "ì",
    "ò",
    "ù",
    "â",
    "ê",
    "î",
    "ô",
    "û",
    "æ",
    "Æ",
    "œ",
    "Œ",
    "Ð",
    "ð",
    "Þ",
    "þ",
    "Ł",
    "ł",
    "─",
    "│",
    "┌",
    "┐",
    "└",
    "┘",
    "┼",
    "═",
    "║",
    "╔",
    "╗",
    "╚",
    "╝",
    "♠",
    "♣",
    "♥",
    "♦",
    "♂",
    "♀",
    "♪",
    "♫",
    "☼",
    "☻",
    "☺",
    "α",
    "β",
    "γ",
    "δ",
    "ε",
    "θ",
    "λ",
    "μ",
    "π",
    "σ",
    "φ",
    "Ω",
    "ω",
    "Δ",
    "Σ",
    "Φ",
];

const charactermapbody = document.getElementById("charactermap-body");
for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    const characterDiv = document.createElement("div");
    characterDiv.className = "character";
    characterDiv.innerHTML = character;
    charactermapbody.appendChild(characterDiv);
};

const adresnames = [
    "Alice Davenport",
    "Bob Kessler",
    "Carla Montez",
    "Derek Zhang",
    "Eliza Hartley",
    "Fred Cooper",
    "Gina Rojas",
    "Henry Fulton",
    "Isla Bernstein",
    "Jake Winters",
    "Kara Lin",
    "Liam Owens",
    "Mia Albright",
    "Noah Devine",
    "Olivia Trent",
    "Paul Reyes",
    "Quinn Foster",
    "Ruby Chan",
    "Simon Vickers",
    "Tara Caldwell",
    "Ursula Blake"
];
const adresemails = [
    "alice.d@netmail.com",
    "bobk@cyberverse.net",
    "carla.m@eclipsemail.com",
    "derekz@quickmail.org",
    "eliza.h@retroemail.com",
    "fred.cooper@jetstream.net",
    "g.rojas@hotline.com",
    "henryf@netpath.net",
    "isla.b@earthmail.com",
    "jwinters@openconnect.com",
    "kara_lin@glowmail.net",
    "lowens@digimail.org",
    "mia.a@vintagemail.net",
    "ndevine@netpost.org",
    "olivia.trent@inboxx.org",
    "paulr@connectme.net",
    "q.foster@ethermail.com",
    "rubychan@localnet.com",
    "simon.v@neowave.org",
    "t.caldwell@fastmailbox.net",
    "ursulablake@netpath.net"
];
const adresphones = [
    "+31 6 12345678",
    "+31 20 7654321",
    "+31 6 23456789",
    "+31 10 9988776",
    "+31 6 34567890",
    "+31 30 1122334",
    "+31 6 45678901",
    "+31 50 6677885",
    "+31 6 56789012",
    "+31 70 3344556",
    "+31 6 67890123",
    "+31 13 5566778",
    "+31 6 78901234",
    "+31 23 4455667",
    "+31 6 89012345",
    "+31 40 2233445",
    "+31 6 90123456",
    "+31 38 9988776",
    "+31 6 01234567",
    "+31 26 1122448",
    "+31 6 43883902",
];
const adresfacts = [
    "Graphic designer who collects vintage postcards.",
    "Once built a computer from spare parts in a weekend.",
    "Speaks Spanish, French, and a little Italian.",
    "Fan of retro video games and owns a Sega Saturn.",
    "Has a stamp collection with over 500 stamps.",
    "Met their spouse at a 90s LAN party.",
    "Loves jazz music and plays the saxophone.",
    "Owns a small bookstore with a hidden reading nook.",
    "Volunteers at a local animal shelter on weekends.",
    "Amateur photographer who shoots only on film.",
    "Published a short story in a local literary journal.",
    "Can solve a Rubik’s cube in under 60 seconds.",
    "Runs a weekly book club in their neighborhood.",
    "Guitar teacher who once played in a ska band.",
    "Has hiked the entire Pieterpad trail in the Netherlands.",
    "Learned JavaScript by building a vintage website clone.",
    "Produces a podcast about unsolved tech mysteries.",
    "Is an expert in bonsai tree cultivation.",
    "From London, now lives in a canal house in Amsterdam.",
    "Known for replying to emails faster than anyone else.",
    "Absolute madman behind the steering wheel."
];

const adresbody = document.getElementById("adres-body");
for (let t = 0; t < adresnames.length; t++) {
    const adresname = adresnames[t];
    const adresemail = adresemails[t];
    const adresphone = adresphones[t];
    const adresfact = adresfacts[t];

    const adresDiv = document.createElement("div");
    adresDiv.className = "adresdiv";
    adresDiv.innerHTML = '<strong style="margin-right: 15px; margin-left=5px;">' + adresname + '</strong><br>' + adresemail + '<br>' + adresphone + '<br>' + adresfact;
    adresbody.appendChild(adresDiv);
};

document.getElementById("start-button").addEventListener("mousedown", function () {
    document.getElementById("start-button").style.border = "1px solid gray";
    document.getElementById("popup").style.display = "block";
});
document.getElementById("start-button").addEventListener("mouseup", function () {
    document.getElementById("start-button").style.border = "3px solid black";
});


document.getElementById("subpop1").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu1").style.display = "block";
});
document.getElementById("subpop1").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu1").style.display = "none";
});

document.getElementById("subpopmenu1").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu1").style.display = "block";
});
document.getElementById("subpopmenu1").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu1").style.display = "none";
});

document.getElementById("subsubpopmenu1").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu1").style.display = "block";
});
document.getElementById("subsubpopmenu1").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu1").style.display = "none";
});


document.getElementById("subpop2").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu2").style.display = "block";
});
document.getElementById("subpop2").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu2").style.display = "none";
});

document.getElementById("subpopmenu2").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu2").style.display = "block";
});
document.getElementById("subpopmenu2").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu2").style.display = "none";
});
document.getElementById("subsubpopmenu2").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu1").style.display = "block";
});
document.getElementById("subsubpopmenu2").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu1").style.display = "none";
});


document.getElementById("subpop3").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu3").style.display = "block";
});
document.getElementById("subpop3").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu3").style.display = "none";
});

document.getElementById("subpopmenu3").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu3").style.display = "block";
});
document.getElementById("subpopmenu3").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu3").style.display = "none";
});


document.getElementById("subsubpop1").addEventListener("mouseover", function () {
    document.getElementById("subsubpopmenu1").style.display = "block";
});
document.getElementById("subsubpop1").addEventListener("mouseout", function () {
    document.getElementById("subsubpopmenu1").style.display = "none";
});

document.getElementById("subsubpopmenu1").addEventListener("mouseover", function () {
    document.getElementById("subsubpopmenu1").style.display = "block";
});
document.getElementById("subsubpopmenu1").addEventListener("mouseout", function () {
    document.getElementById("subsubpopmenu1").style.display = "none";
});


document.getElementById("subsubpop2").addEventListener("mouseover", function () {
    document.getElementById("subsubpopmenu2").style.display = "block";
});
document.getElementById("subsubpop2").addEventListener("mouseout", function () {
    document.getElementById("subsubpopmenu2").style.display = "none";
});

document.getElementById("subsubpopmenu2").addEventListener("mouseover", function () {
    document.getElementById("subsubpopmenu2").style.display = "block";
});
document.getElementById("subsubpopmenu2").addEventListener("mouseout", function () {
    document.getElementById("subsubpopmenu2").style.display = "none";
});


document.addEventListener("mouseup", function(event){
    let popup = document.getElementById("popup");
    let startButton = document.getElementById("start-button");
    if (!popup.contains(event.target) && !startButton.contains(event.target) && !document.getElementById("subpopmenu1").contains(event.target) && !document.getElementById("subpopmenu2").contains(event.target) && !document.getElementById("subpopmenu3").contains(event.target) && !document.getElementById("subsubpopmenu1").contains(event.target) && !document.getElementById("subsubpopmenu2").contains(event.target)) {
        popup.style.display = "none";
    }
});

let time = new Date();
let hours = time.getHours();
let minutes = time.getMinutes();

if (hours > 12) {
    hours = hours - 12;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    document.getElementById("time").innerHTML = hours + ":" + minutes + " PM";
}

else {
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    document.getElementById("time").innerHTML = hours + ":" + minutes + " AM";
}

setInterval(() => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (hours > 12) {
        hours = hours - 12;
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        document.getElementById("time").innerHTML = hours + ":" + minutes + " PM";
    }

    else {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        document.getElementById("time").innerHTML = hours + ":" + minutes + " AM";
    }
}, 5000);

function openchar() {
    document.getElementById("charactermap").style.display = "block";
}
function closechar() {
    document.getElementById("charactermap").style.display = "none";
    document.getElementById("charactermap").style.width = "50vw";
    document.getElementById("charactermap").style.top = "10px";
    document.getElementById("charactermap").style.right = "10px";
};
function largechar() {
    document.getElementById("charactermap").style.width = "100vw";
    document.getElementById("charactermap").style.top = "0px";
    document.getElementById("charactermap").style.right = "0px";

}

function openadres() {
    document.getElementById("adres").style.display = "block";
}
function closeadres() {
    document.getElementById("adres").style.display = "none";
    document.getElementById("adres").style.width = "50vw";
    document.getElementById("adres").style.top = "10px";
    document.getElementById("adres").style.right = "10px";
    document.getElementById("adres").style.height = "";
    for (let i = 0; i < adresnames.length; i++) {
        const adresDiv = adresbody.children[i];
        adresDiv.style.minHeight = "100px";
    }
};
function largeadres() {
    document.getElementById("adres").style.width = "100vw";
    document.getElementById("adres").style.top = "0px";
    document.getElementById("adres").style.right = "0px";
    document.getElementById("adres").style.height = "calc(100vh - 55px)";
    for (let i = 0; i < adresnames.length; i++) {
        const adresDiv = adresbody.children[i];
        adresDiv.style.minHeight = "80px";
    }
}


function openbin() {
    document.getElementById("bin").style.display = "block";
}
function closebin() {
    document.getElementById("bin").style.display = "none";
    document.getElementById("bin").style.width = "40vw";
    document.getElementById("bin").style.top = "5px";
    document.getElementById("bin").style.right = "250px";
    document.getElementById("bin").style.height = "";
};
function largebin() {
    document.getElementById("bin").style.width = "100vw";
    document.getElementById("bin").style.top = "0px";
    document.getElementById("bin").style.right = "0px";
    document.getElementById("bin").style.height = "calc(100vh - 55px)";

}

function opennetwork() {
    document.getElementById("network").style.display = "block";
}
function closenetwork() {
    document.getElementById("network").style.display = "none";
    document.getElementById("network").style.width = "40vw";
    document.getElementById("network").style.top = "20px";
    document.getElementById("network").style.right = "600px";
    document.getElementById("network").style.height = "";
};
function largenetwork() {
    document.getElementById("network").style.width = "100vw";
    document.getElementById("network").style.top = "0px";
    document.getElementById("network").style.right = "0px";
    document.getElementById("network").style.height = "calc(100vh - 55px)";

}