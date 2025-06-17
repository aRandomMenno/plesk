if (navigator.userAgent.indexOf("Firefox") !== -1) {
    const link = "./css/firefoxfix.css";
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.type = "text/css";
    document.head.appendChild(linkElement);
    linkElement.href = link;
}