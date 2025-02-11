document.addEventListener("DOMContentLoaded", function() {
    const terminalOutput = document.getElementById("terminalOutput");
    const terminalInput = document.querySelector(".terminal-input");
    const closeButton = document.querySelector(".button.close");
    let isAdmin = false;
    let awaitingPassword = false;

    function appendText(text, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                terminalOutput.innerHTML += `<p>${text}</p>`;
                terminalOutput.scrollTop = terminalOutput.scrollHeight; // Scroll to bottom
                resolve();
            }, delay);
        });
    }

    async function showBootSequence() {
        await appendText("Loading...", 1000);
        await appendText("Initializing system...", 1000);
        await appendText("Starting services...", 1000);
        await appendText("System ready.", 1000);
        await appendText("Awaiting Credentials...", 1000);
        terminalInput.style.display = "block"; // Show terminal input
        terminalInput.focus(); // Focus on the input
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Ensure scrollbar is at the bottom
    }

    function handleCommand(command) {
        if (command === "/content") {
            window.location.href = "content.html";
        } else if (command === "/help") {
            appendText("Available commands:", 0);
            appendText("/content - Go to content page", 0);
            appendText("/help - List available commands", 0);
            if (isAdmin) {
                appendText("/admin - Access admin controls", 0);
            }
        } else if (command === "/admin") {
            promptForPassword();
        } else {
            appendText(`Command not found: ${command}`, 500);
        }
    }

    function promptForPassword() {
        appendText("Enter admin password:", 0);
        awaitingPassword = true;
    }

    function verifyPassword(password) {
        const correctPassword = "Komodo"; // Replace with your desired password
        if (password === correctPassword) {
            isAdmin = true;
            appendText("Access granted. You are now an admin.", 0);
        } else {
            appendText("Access denied. Incorrect password.", 0);
        }
        awaitingPassword = false;
    }

    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const input = terminalInput.value.trim();
            appendText(`> ${input}`, 0);
            terminalInput.value = "";
            if (awaitingPassword) {
                verifyPassword(input);
            } else {
                handleCommand(input);
            }
        }
    });

    closeButton.addEventListener("click", function() {
        window.location.href = "https://www.google.com";
    });

    function initializeTerminal() {
        appendText("System ready.", 0);
        appendText("Awaiting Credentials...", 0);
        terminalInput.style.display = "block"; // Show terminal input
        terminalInput.focus(); // Focus on the input
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Ensure scrollbar is at the bottom
    }

    const urlParams = new URLSearchParams(window.location.search);
    const skipLoading = urlParams.get('skipLoading');

    if (skipLoading === 'true') {
        initializeTerminal();
    } else {
        showBootSequence();
    }
});