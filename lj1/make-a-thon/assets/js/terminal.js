let user;
let users;
let currentDir;
let outputs;
let currentPath;
let promptFormat = "{dir} $ ";
let commandHistory = [];
let version = "v8.21.2 Alpha";
let programs = [
	"calculator", "minesweeper",
	"wordle", "snake",
]
const commandLine = document.getElementById("command-line");
let isNanoActive = false;
let nanoCurrentFile = null;
let nanoContent = "";

// a b c d e f g h i j k l m n o p q r s t u v w x y z
const commandList = {
	"adduser": "Add a new user to the system.",
	"calc": "Open the calculator.",
	"cat": "Shows the content of a file.",
	"cd": "Change the current working directory.",
	"clear": "Clear the terminal screen. (aliases: cls)",
	"cls": "Clear the terminal screen. (aliases: clear)",
	"cp": "Copy files or directories.",
	"deluser": "Delete a user from the system.",
	"exit": "Alt for \"shutdown\".",
	"help": "Displays all commands available in the terminal. (there are hidden ones)",
	"history": "Show the command history. (last 10 commands)",
	"ls": "Shows all files and folder in the current directory.",
	"mkdir": "Creates a new directory.",
	"mv": "Move files or directories.",
	"nano": "Easily edit any text file.",
	"open-gui": "Open the GooberOS GUI.",
	"prompt": "Change the terminal prompt format. Use {user} for username, {dir} for current directory.",
	"pwd": "Print the current working directory.",
	"reboot": "Reboots GooberOS.",
	"recls": "Clear local storage and refresh the page. (for testing)",
	"rm": "Remove files or directories.",
	"rmdir": "Remove a directory.",
	"run": "Run programs or games, see them with `run list`. (calculator, minesweeper...)",
	"shutdown": "Shuts down GooberOS.",
	"su": "Login to another user.",
	"team": "SShows the team behind GooberOS.",
	"touch": "Creates a new file.",
	"version": "Shows the current version of GooberOS. (aliases: ver)",
	"users": "Shows a list off all users on the system.",
	"whoami": "Shows the user you are logged in as.",

	// If we have time left:
	// "head": "Show the first lines of a file.",
	// "tail": "Show the last lines of a file.",
	// "find": "Search for your files in your current directory. (recursive from your pwd)",

	// Perhaps: (would take 10 billion years to implement)
	// "chmod": "Change the permissions of a file.",
	// "chown": "Change the owner of a file.",
	// "ping": "Ping a server.",
	// "curl": "Download a file from the internet. (needs a direct link to the file)",
};

function boot() {
	if (localStorage.getItem("users") == undefined) {
		localStorage.setItem("users", JSON.stringify(["root", "user", "guest", "jea", "menno", "rianne", "stone", "tigo"]));
	}
	users = JSON.parse(localStorage.getItem("users"));
	if (localStorage.getItem("user") == undefined) {
		localStorage.setItem("user", "user");
	}
	if (localStorage.getItem("currentDir") == undefined) {
		localStorage.setItem("currentDir", "/home/user");
	}
	currentDir = localStorage.getItem("currentDir");
	if (localStorage.getItem("fileStructure") == undefined) {
		localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
	}
	fileStructure = JSON.parse(localStorage.getItem("fileStructure"));

	if (localStorage.getItem("promptFormat") != undefined) {
		promptFormat = localStorage.getItem("promptFormat");
	}

	outputs = document.getElementById("outputs");
	currentPath = document.querySelector("#path");
	updatePrompt();
	currentPath.scrollIntoView();
	url = new URL(window.location.href);

	if (url.hash !== "#no-reboot") {
		startSequence();
	} else {
		commandLine.style.display = 'flex';
		outputs.innerHTML = "";
		createOutput(`GooberOS&trade; web terminal [${version}]`, "line");
		createOutput('&copy; 2025 GooberOS, all rights reserved.', "line");
		createOutput('Logged in as: <span class="user" id="user"></span>.', "line");
		createOutput("Type <span class=\"cmd\">help</span> for a list of commands!", "line");
		user = localStorage.getItem("user");
		document.getElementById("user").innerHTML = user;
	}

	window.addEventListener("click", function() {
		if (!isNanoActive) {
			document.getElementById("commandInput").focus();
		}
	});
}

function formatPrompt() {
	if (currentDir === "/") {
		return "$ ";
	}

	let formatted = promptFormat;
	formatted = formatted.replace("{user}", user);
	formatted = formatted.replace("{dir}", currentDir);
	return formatted;
}

function updatePrompt() {
	currentPath.innerHTML = `${formatPrompt()}`;
}

window.addEventListener("keydown", (event) => {
	if (isNanoActive) return;
	
	if (event.key === "Enter") {
		processCommand(event.target.value);
		event.target.value = "";
		event.target.scrollIntoView();
	}
});

function getPathObject(path) {
	let current = fileStructure;
	if (path === "/") return current["/"];

	const parts = path.split("/").filter(p => p);
	current = current["/"];

	for (const part of parts) {
		if (!current[part]) return null;
		current = current[part];
	}

	return current;
}

function isDirectory(path) {
	const pathObj = getPathObject(path);
	return pathObj && (pathObj[".type"] === "directory" || !pathObj[".type"]);
}

function getParentAndFileName(path) {
	if (path === '/') return { parent: null, name: '/' };

	const parts = path.split('/').filter(p => p);
	const fileName = parts.pop();
	const parentPath = '/' + parts.join('/');

	return {
		parent: parts.length > 0 ? getPathObject(parentPath) : getPathObject('/'),
		name: fileName,
		parentPath: parentPath
	};
}

function canAccessFile(fileObj) {
	if (!fileObj || !fileObj[".lock"]) return true;
	return user === "root";
}

async function fetchCatImage() {
	try {
		const response = await fetch("https://api.thecatapi.com/v1/images/search");
		const data = await response.json();
		if (data && data.length > 0) {
			return data[0].url;
		}
		return null;
	} 
	catch (error) {
		return null;
	}
}

function processCommand(commandInput) {
	const lowerCaseCommand = commandInput.toLowerCase().trim();
	let command = lowerCaseCommand.split(" ")[0];
	let input = commandInput.split(" ").slice(1).join(" ");
	let output;

	if (command === "run") {
		if (input === "list") {
			output = "Available programs: <br>";
			for (const program of programs) {
				output += `<span class="cmd">${program}</span><br>`;
			}
		}
		if (programs.includes(input)) {
			output = `Opening ${input}...`;
			setTimeout(() => {
				window.open(`./desktop/${input}`, "_self");
			}, 1000);
		}
	}

	if (command === "team") {
		output = `
			GooberOS&trade; Team: <br>
			<span class="startup"><span class="jea">Goober Jea</span>,<span class="warning"> JavaScript</span> wiz, <span class="output">fixer</span>, <span class=\"dir\">Night owl</span>.</span> <br>
			<span class="startup"><ggm>Goofy Goober Menno</ggm>. <spf>Space and time are frozen, but somehow people are stil moving</spf>. Also you should <span style="color: #f0f">Git gud to Git god.</span></span> <br>
			<span class="startup">Goober Rianne, Ik ben Rianne, ik ben bijna 19 en ik heb de calculator en wordle game gemaakt voor dit project.</span> <br>
			<span class="startup stone">Goober Stone, [Insert very funny and original quote here]</span> <br>
			<span class="startup"><span class="tigo">Goober Tigo</span>, <span class="error">HTML</span> & <span class="info">CSS</span>, <span class="info">P</span><span class="text">H</span><span class="info">P</span> <span class="text">Enjoyer</span>, <span class="dir">Sadge</span> <span class="info">Tester</span>.</span>
		`
	}

	// CommandLine text editor.
	if (command === "nano") {
		if (!input) {
			output = "<span class=\"error\">nano: missing file operand!</span>";
		}
		else {
			let path = input.startsWith("/") ? input : currentDir + (currentDir.endsWith("/") ? "" : "/") + input;
			let pathObj = getPathObject(path);
			if (pathObj && pathObj[".type"] === "file") {
				if (canAccessFile(pathObj)) {
					createOutputLine(commandInput);
					startNanoEditor(path, pathObj);
				} 
				else {
					output = `<span class=\"error\">nano: ${input}: Permission denied!</span>`;
				}
			} else {
				if (input.includes("/")) {
					const { parent, name, parentPath } = getParentAndFileName(path);
					if (parent) {
						if (parent[".lock"] && user !== "root") {
							output = `<span class=\"error\">nano: ${input}: Permission denied!</span>`;
						} 
						else {
							createOutputLine(commandInput);
							parent[name] = { ".type": "file", "content": "" };
							localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
							startNanoEditor(path, parent[name]);
						}
					} else {
						output = `<span class=\"error\">nano: ${input}: Directory does not exist!</span>`;
					}
				} 
				else {
					let pathObj = getPathObject(currentDir);
					if (pathObj) {
						if (pathObj[".lock"] && user !== "root") {
							output = `<span class=\"error\">nano: ${input}: Permission denied!</span>`;
						} 
						else {
							createOutputLine(commandInput);
							pathObj[input] = { ".type": "file", "content": "" };
							localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
							startNanoEditor(path, pathObj[input]);
						}
					}
				}
			}
		}
	}

	if (command === "history") {
		if (commandHistory.length === 0) {
			output = "<span class=\"info\">No command history available.</span>";
		} else {
			output = "Command history: <br>";
			for (let i = 0; i < commandHistory.length; i++) {
				output += `<span class="cmd">${commandHistory[i]}</span><br>`;
			}
		}
	}

	if (command === "calc") {
		output = "Opening calculator...";
		setTimeout(() => {
			window.open("./desktop/calc", "_self");
		}, 1000);
	}

	if (command === "version" || command === "ver") {
		output = `You are currently running: GooberOS&trade; ${version}.`;
	}

	if (command === "open-gui") {
		openGUIsequence();
	}

	if (command === "whoami") {
		if (user !== "root") {
			output = user;
		}
		else {
			output = `<span class="root">${user}</span>`;
		}
	}

	if (command === "clear" || command === "cls") {
		outputs.innerHTML = "";
	}

	if (command === "ls") {
		let path = input ? (input.startsWith('/') ? input : currentDir + (currentDir.endsWith('/') ? '' : '/') + input) : currentDir;
		let pathObj = getPathObject(path);

		if (pathObj) {
			if (pathObj[".lock"] === true && user !== "root") {
				output = `<span class="error">ls: ${input}: Permission denied!</span>`;
			}
			else if (pathObj[".type"] !== "file" && pathObj[".type"] !== "executable") {
				output = Object.keys(pathObj)
					.filter(key => key !== ".type" && !pathObj[key][".ghost"] && !pathObj[key][".lock"])
					.map(key => {
						const item = pathObj[key];
						if (item && item[".type"] === "file") {
							return `<span class="file">${key}</span>`;
						} else if (item && item[".type"] === "directory") {
							return `<span class="dir">${key}</span>`;
						} else {
							return `<span class="dir">${key}</span>`;
						}
					})
					.join("   ");
				}
			else {
				output = `<span class="error">ls: ${input}: Not a directory!</span>`;
			}
		}
		else {
			output = `<span class=\"error\">ls: ${input}: No such directory!</span>`;
		}
	}

	if (command === "cat") {
		if (input === "cat") {
			createOutputLine(commandInput);
			createOutput("Fetching a cat for you...");
			fetchCatImage().then(url => {
				if (url) {
					const catOutput = document.createElement("div");
					catOutput.className = "output";
					catOutput.innerHTML = `<img src="${url}" alt="Random Cat" style="max-width: 100%; max-height: 300px;">`;
					outputs.appendChild(catOutput);
					outputs.scrollTop = outputs.scrollHeight;
				} else {
					createOutput("Failed to fetch cat image. Meow?", "error");
				}
			});
		} 
		else if (input === "") {
			output = "<span class=\"error\">cat: missing operand!</span>";
		}
		else {
			let path = input.startsWith('/') ? input : currentDir + (currentDir.endsWith('/') ? '' : '/') + input;
			let pathObj = getPathObject(path);
			if (pathObj && pathObj[".type"] === "file") {
				if (canAccessFile(pathObj)) {
					output = pathObj["content"];
				} else {
					output = `<span class=\"error\">cat: ${input}: Permission denied!</span>`;
				}
			}
			else {
				output = `<span class=\"error\">cat: ${input}: No such file!</span>`;
			}
		}
	}

	if (command === "pwd") {
		output = currentDir;
	}

	if (command === "cd") {
		createOutputLine(commandInput);
		let path = input;
		let newDir = currentDir;

		if (!path) {
			if (user !== "root") {
				newDir = "/home/" + user;
			}
			else {
				newDir = "/root";
			}
		}
		else if (path === "..") {
			if (currentDir !== "/") {
				newDir = currentDir.substring(0, currentDir.lastIndexOf("/"));
				if (newDir === "") {
					newDir = "/";
				}
			}
		}
		else if (path === ".") {
			newDir = currentDir;
		}
		else if (path === "/") {
			newDir = "/";
		}
		else {
			if (path.startsWith("/")) {
				newDir = path;
			} else {
				newDir = currentDir === "/" ? "/" + path : currentDir + "/" + path;
			}

			if (newDir !== "/" && newDir.endsWith("/")) {
				newDir = newDir.slice(0, -1);
			}
		}

		let dirObj = getPathObject(newDir);
		if (isDirectory(newDir)) {
			if (dirObj && dirObj[".lock"] && user !== "root") {
				createOutput(`cd: ${path}: Permission denied!`, "error");
			} else {
				currentDir = newDir;
				localStorage.setItem("currentDir", currentDir);
				updatePrompt();
			}
		}
		else {
			createOutput(`cd: ${path}: No such file or directory!`, "error");
		}
	}

	if (command === "rm") {
		if (input) {
			let recursive = false;
			let targetPath = input;

			if (input.startsWith("-r ")) {
				recursive = true;
				targetPath = input.substring(3).trim();
			}

			let path = targetPath.startsWith("/") ? targetPath : currentDir + (currentDir.endsWith("/") ? "" : "/") + targetPath;
			let pathObj = getPathObject(path);

			if (pathObj) {
				if (pathObj[".lock"] && user !== "root") {
					output = `<span class=\"error\">rm: ${targetPath}: Permission denied!</span>`;
				} else if (pathObj[".type"] === "directory" && !recursive) {
					output = `<span class=\"warning\">rm: ${targetPath}: Is a directory (use -r to remove directories).</span>`;
				} else {
					const { parent, name } = getParentAndFileName(path);
					if (parent && parent[name]) {
						delete parent[name];
						localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
						output = `${targetPath} removed.`;
					} else {
						output = `<span class=\"error\">rm: ${targetPath}: Could not remove!</span>`;
					}
				}
			} else {
				output = `<span class=\"error\">rm: ${targetPath}: No such file or directory!</span>`;
			}
		} else {
			output = "<span class=\"error\">rm: missing operand!<span class=\"error\">";
		}
	}

	if (command === "touch") {
		if (input) {
			let path = input.startsWith("/") ? input : currentDir + (currentDir.endsWith("/") ? "" : "/") + input;
			let pathObj = getPathObject(path);

			if (pathObj) {
				output = `<span class=\"info\">touch: ${input}: File already exists.</span>`;
			} else {
				const { parent, name } = getParentAndFileName(path);
				if (parent) {
					if (parent[".lock"] && user !== "root") {
						output = `touch: ${input}: Permission denied`;
					} else {
						parent[name] = { ".type": "file", "content": "" };
						localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
						output = `${input} created.`;
					}
				} else {
					output = `<span class=\"error\">touch: ${input}: Could not create file!</span>`;
				}
			}
		}
		else {
			output = "<span class=\"error\">touch: missing operand!<span>";
		}
	}

	if (command === "mkdir") {
		if (input) {
			let path = input.startsWith("/") ? input : currentDir + (currentDir.endsWith("/") ? "" : "/") + input;
			let pathObj = getPathObject(path);

			if (pathObj) {
				output = `<span class=\"info\">mkdir: ${input}: Directory already exists</span>`;
			} else {
				const { parent, name } = getParentAndFileName(path);
				if (parent) {
					if (parent[".lock"] && user !== "root") {
						output = `<span class=\"error\">mkdir: ${input}: Permission denied</span>`;
					} else {
						parent[name] = { ".type": "directory" };
						localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
						output = `${input} created.`;
					}
				} else {
					output = `<span class=\"error\">mkdir: ${input}: Could not create directory</span>`;
				}
			}
		}
		else {
			output = "<span class=\"error\">mkdir: missing operand<span>";
		}
	}

	if (command === "rmdir") {
		if (input) {
			let path = input.startsWith("/") ? input : currentDir + (currentDir.endsWith("/") ? "" : "/") + input;
			let pathObj = getPathObject(path);

			if (!pathObj) {
				output = `<span class=\"error\">rmdir: ${input}: No such directory</span>`;
			} else if (pathObj[".type"] !== "directory") {
				output = `<span class=\"error\">rmdir: ${input}: Not a directory</span>`;
			} else {
				const { parent, name } = getParentAndFileName(path);
				if (parent) {
					if (parent[".lock"] && user !== "root") {
						output = `<span class=\"error\">rmdir: ${input}: Permission denied</span>`;
					} else {
						delete parent[name];
						localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
						output = `${input} removed.`;
					}
				} else {
					output = `<span class=\"error\">rmdir: ${input}: Could not remove directory</span`;
				}
			}
		} else {
			output = "<span class=\"error\">rmdir: missing operand<span>";
		}
	}

	if (command === "users") {
		output = users.join("   ");
	}

	if (command === "adduser") {
		if (input && users.indexOf(input) === -1) {
			users.push(input);
			localStorage.setItem("users", JSON.stringify(users));
		} else {
			output = "<span class=\"error\">Incorrect input!</span>";
		}
	}

	if (command === "deluser") {
		if (input && users.length > 1 && users.indexOf(input) !== -1) {
			users.splice(users.indexOf(input), 1);
			localStorage.setItem("users", JSON.stringify(users));
		} else {
			output = "<span class=\"error\">Incorrect input!</span>";
		}
	}

	if (command === "help") {
		output = "<w>Available commands:</w><br>";
		for (const cmd in commandList) {
			output += `<span class="cmd">${cmd}</span><w>: </w><span class="desc">${commandList[cmd]}</span><br>`;
		}
	}

	if (command === "exit" || command === "shutdown") {
		stopSequence();
	}

	if (command === "reboot") {
		(async () => {
			await stopSequence();
			window.location.href = window.location.href.split("#")[0];
		})();
	}

	if (command === "recls") {
		localStorage.clear();
		window.location.reload();
	}

	if (command === "cp") {
		if (!input || input.split(" ").length < 2) {
			output = "<span class=\"error\">cp: missing file operand</span>";
		} else {
			const args = input.split(" ");
			const source = args[0];
			const destination = args[1];

			let sourcePath = source.startsWith("/") ? source : currentDir + (currentDir.endsWith("/") ? "" : "/") + source;
			let destPath = destination.startsWith("/") ? destination : currentDir + (currentDir.endsWith("/") ? "" : "/") + destination;
			let sourceObj = getPathObject(sourcePath);

			if (!sourceObj) {
				output = `<span class=\"error\">cp: ${source}: No such file or directory</span>`;
			} else if (sourceObj[".lock"] && user !== "root") {
				output = `<span class=\"error\">cp: ${source}: Permission denied</span>`;
			} else {
				const destParentInfo = getParentAndFileName(destPath);
				if (!destParentInfo.parent) {
					output = `<span class=\"error\">cp: cannot create '${destination}': Directory does not exist</span>`;
				} else if (destParentInfo.parent[".lock"] && user !== "root") {
					output = `<span class=\"error\">cp: ${destination}: Permission denied</span>`;
				} else {
					const sourceClone = JSON.parse(JSON.stringify(sourceObj));
					destParentInfo.parent[destParentInfo.name] = sourceClone;
					localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
					output = `'${source}' copied to '${destination}'`;
				}
			}
		}
	}

	if (command === "mv") {
		if (!input || input.split(" ").length < 2) {
			output = "<span class=\"error\">mv: missing file operand!</span>";
		} else {
			const args = input.split(" ");
			const source = args[0];
			const destination = args[1];

			let sourcePath = source.startsWith("/") ? source : currentDir + (currentDir.endsWith("/") ? "" : "/") + source;
			let destPath = destination.startsWith("/") ? destination : currentDir + (currentDir.endsWith("/") ? "" : "/") + destination;
			let sourceObj = getPathObject(sourcePath);

			if (!sourceObj) {
				output = `<span class=\"error\">mv: ${source}: No such file or directory!</span>`;
			} else if (sourceObj[".lock"] && user !== "root") {
				output = `<span class=\"error\">mv: ${source}: Permission denied!</span>`;
			} else {
				const sourceParentInfo = getParentAndFileName(sourcePath);
				const destParentInfo = getParentAndFileName(destPath);

				if (!destParentInfo.parent) {
					output = `<span class=\"error\">mv: cannot move '${source}' to '${destination}': Directory does not exist!</span>`;
				} else if (destParentInfo.parent[".lock"] && user !== "root") {
					output = `<span class=\"error\">mv: ${destination}: Permission denied!</span>`;
				} else if (sourceParentInfo.parent[".lock"] && user !== "root") {
					output = `<span class=\"error\">mv: ${source}: Permission denied!</span>`;
				} else {
					const sourceClone = JSON.parse(JSON.stringify(sourceObj));
					destParentInfo.parent[destParentInfo.name] = sourceClone;
					delete sourceParentInfo.parent[sourceParentInfo.name];
					localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
					output = `'${source}' moved to '${destination}'`;
				}
			}
		}
	}

	if (command === "su") {
		if (!input) {
			if (user === "root") {
				output = "<span class=\"info\">You are already logged in as root.</span>";
			} else {
				user = "root";
				localStorage.setItem("user", user);
				document.getElementById("user").innerHTML = user;
				output = `Now logged in as <span class="root">${user}</span>`;
				updatePrompt();
			}
		} else if (users.includes(input)) {
			if (user === input) {
				output = `<span class=\"info\">You are already logged in as ${input}.</span>`;
			} else {
				user = input;
				localStorage.setItem("user", user);
				document.getElementById("user").innerHTML = user;
				output = `Now logged in as ${user}`;
				updatePrompt();
			}
		} else {
			output = `<span class=\"error\">su: '${input}': No such user!</span>`;
		}
	}

	if (command === "prompt") {
		if (input) {
			promptFormat = input;
			localStorage.setItem("promptFormat", promptFormat);
			updatePrompt();
			output = `Prompt changed to: ${input}`;
		}
		else {
			output = `Current prompt format: ${promptFormat}`;
		}
	}

	if (commandHistory.length >= 10) {
		commandHistory.shift();
		commandHistory.push(commandInput);
	}
	else {
		commandHistory.push(commandInput);
	}

	if (output) {
		createOutputLine(commandInput);
		createOutput(output);
	}
	else if (commandList[command] === undefined && command !== "") {
		createOutputLine(commandInput);
		createOutput("Command not found!", "error");
	}
}

function createOutputLine(command) {
	const line = document.createElement("div");
	line.className = "line";
	line.innerHTML = `<span class="path">${formatPrompt()}</span>${command}`;
	outputs.appendChild(line);
	outputs.scrollTop = outputs.scrollHeight;
}

function createOutput(output, className) {
	const outputElement = document.createElement("div");
	outputElement.className = "output";
	if (className) {
		outputElement.classList.add(className);
	}
	outputElement.innerHTML = `${output}`;
	outputs.appendChild(outputElement);
}

// This function is AI code, because I could not for the life of me figure out how to scroll to the newest line.
// Helper function to force scroll after each output
async function createOutputAndScroll(message, className, delayTime) {
	const outputElement = document.createElement("div");
	outputElement.className = "output";
	if (className) {
		outputElement.classList.add(className);
	}
	outputElement.innerHTML = `${message}`;
	outputs.appendChild(outputElement);

	// Force scroll using more reliable methods
	window.requestAnimationFrame(() => {
		const lastElement = outputs.lastElementChild;
		if (lastElement) {
			lastElement.scrollIntoView({ behavior: 'auto', block: 'end' });
		}
		outputs.scrollTop = outputs.scrollHeight;
	});

	if (delayTime) {
		await delay(delayTime);
	}
}

async function startSequence() {
	const commandLine = document.getElementById("command-line");
	commandLine.style.display = 'none';

	await createOutputAndScroll("Starting up...", "info", randInt(50, 100));
	await createOutputAndScroll("Loading: Initializing system 1%", "startup", randInt(50, 250));

	for (let i = 2; i < 100; i += 10) {
		let percentage = randInt(i, i + 9);
		await createOutputAndScroll(`Loading: Initializing system ${percentage}%`, "startup", randInt(50, 250 - (i * 1.5)));
	}

	await createOutputAndScroll("Loading: Initializing system 100%", "startup");
	await createOutputAndScroll("System initialized successfully! No errors were encountered during startup.", "output");
	await createOutputAndScroll("Checking for updates...", "info", randInt(50, 100));
	await createOutputAndScroll(`Current version: ${version}, latest version: ${version}`, "startup");
	await createOutputAndScroll("No updates available. You are on the latest version.", "output", randInt(50, 100));
	await createOutputAndScroll("Loading: Initializing drivers...", "info", randInt(50, 200));
	await createOutputAndScroll("Loaded: Display driver", "startup", randInt(50, 200));
	await createOutputAndScroll("Loaded: Keyboard driver", "startup", randInt(50, 200));
	await createOutputAndScroll("Loaded: Mouse driver", "startup", randInt(50, 200));
	await createOutputAndScroll("Unable to load network driver, switching to legacy network driver.", "startupWarning", randInt(50, 100));
	await createOutputAndScroll("Loaded: Legacy network driver", "startup", randInt(50, 200));
	await createOutputAndScroll("Loaded: Sound driver", "startup", randInt(50, 200));
	await createOutputAndScroll("Unable to load: Bluetooth driver, no bluetooth capability found!", "startupError", randInt(50, 200));
	await createOutputAndScroll("Drivers loaded.", "output");
	await createOutputAndScroll("Loading: Initializing applications", "info", randInt(50, 200));
	for (const cmd in commandList) {
		await createOutputAndScroll(`Loaded: ${cmd}`, "startup", randInt(50, 200));
	}
	await createOutputAndScroll("All applications loaded successfully!", "output", randInt(50, 200));
	await createOutputAndScroll("Startup complete!", "output", randInt(500, 700));
	await createOutputAndScroll("<img src=\"./assets/media/gleeby.png\" alt=\"GooberOS Cat\">", "output");
	await createOutputAndScroll("", "info", randInt(500, 700));
	await createOutputAndScroll("", "info", randInt(500, 700));
	// More startup content can be added if anyone wants to add more stuff.

	// Clears the startup sequence output.
	outputs.innerHTML = "";

	await createOutputAndScroll(`GooberOS&trade; web terminal [${version}]`, "line");
	await createOutputAndScroll('&copy; 2025 GooberOS, all rights reserved.', "line");
	await createOutputAndScroll('Logged in as: <span class="user" id="user"></span>.', "line");
	await createOutputAndScroll("Type <span class=\"cmd\">help</span> for a list of commands!", "line");

	user = localStorage.getItem("user");
	document.getElementById("user").innerHTML = user;
	commandLine.style.display = 'flex';
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

async function stopSequence() {
	const commandLine = document.getElementById("command-line");
	commandLine.style.display = 'none';

	await delay(300);
	await createOutputAndScroll("Shutting down...", "info", randInt(50, 100));
	await createOutputAndScroll("Saving files...", "info", randInt(50, 250));
	for (let i = 1; i < 100; i += 10) {
		let percentage = randInt(i, i + 9);
		await createOutputAndScroll(`Saving: saving files ${percentage}%`, "startup", randInt(50, 250 - (i * 1.5)));
	}
	await createOutputAndScroll("Saving: saving files 100%", "startup");
	await createOutputAndScroll("Saving: saving files completed!", "output", randInt(50, 100));
	await createOutputAndScroll("Saving: saving settings...", "info", randInt(50, 200));
	for (let i = 1; i < 100; i += 25) {
		let percentage = randInt(i, i + 9);
		await createOutputAndScroll(`Saving: saving settings ${percentage}%`, "startup", randInt(50, 250 - (i * 1.5)));
	}
	await createOutputAndScroll("Saving: saving settings 100%", "startup");
	await createOutputAndScroll("Saving: saving settings completed!", "output", randInt(50, 100));
	await createOutputAndScroll("Shutting down drivers...", "info", randInt(50, 200));
	await createOutputAndScroll("Shutting down: Display driver", "startup", randInt(50, 200));
	await createOutputAndScroll("Shutting down: Keyboard driver", "startup", randInt(50, 200));
	await createOutputAndScroll("Shutting down: Mouse driver", "startup", randInt(50, 200));
	await createOutputAndScroll("Shutting down: Legacy network driver", "startup", randInt(50, 200));
	await createOutputAndScroll("Shutting down: Sound driver", "startup", randInt(50, 200));
	await createOutputAndScroll("Shutting down drivers completed!", "output", randInt(50, 100));
	// More can be added if anyone wants to add more stuff.

	await createOutputAndScroll("GooberOS has been shutdown. You can now close this tab.", "error", randInt(500, 700));
}

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function openGUIsequence() {
	const commandLine = document.getElementById("command-line");
	commandLine.style.display = 'none';
	await delay(200);
	createOutputAndScroll("Opening desktop GUI...", "info", randInt(50, 100));
	for (let i = 1; i < 100; i += 10) {
		let percentage = randInt(i, i + 9);
		await createOutputAndScroll(`Loading: Copying files to RAM ${percentage}%`, "startup", randInt(50, 250 - (i * 1.5)));
	}
	await createOutputAndScroll("Loading: Copying files to RAM 100%", "startup");
	await createOutputAndScroll("Loading: Starting apps, the interface and drivers...", "info");
	await createOutputAndScroll("Loading: Completed!", "output", randInt(50, 100));
	window.location.href = "./desktop/startup/";
}

function startNanoEditor(filePath, fileObj) {
	isNanoActive = true;
	nanoCurrentFile = filePath;
	nanoContent = fileObj.content || "";
	
	commandLine.style.display = 'none';
	outputs.innerHTML = "";
	
	const nanoInterface = document.createElement("div");
	nanoInterface.id = "nano-editor";
	nanoInterface.className = "nano-editor";
	
	const nanoHeader = document.createElement("div");
	nanoHeader.className = "nano-header";
	nanoHeader.innerHTML = `GNU nano ${version.split(" ")[0]} - ${filePath}`;
	
	const nanoTextarea = document.createElement("textarea");
	nanoTextarea.id = "nano-textarea";
	nanoTextarea.className = "nano-textarea";
	nanoTextarea.value = nanoContent;
	nanoTextarea.spellcheck = false;
	nanoTextarea.addEventListener("input", function() {
		nanoContent = this.value;
	});
	
	const nanoFooter = document.createElement("div");
	nanoFooter.className = "nano-footer";
	nanoFooter.innerHTML = `ctrl+O Write to FS   ctrl+X To exit   ctrl+C To cancel edits`;
	
	nanoInterface.appendChild(nanoHeader);
	nanoInterface.appendChild(nanoTextarea);
	nanoInterface.appendChild(nanoFooter);
	
	outputs.appendChild(nanoInterface);
	document.addEventListener("keydown", handleNanoKeydown);
	
	nanoTextarea.focus();
}

function handleNanoKeydown(event) {
	if (!isNanoActive) return;
	
	if (event.key === "Escape" || (event.ctrlKey && event.key.toLowerCase() === "x")) {
		event.preventDefault();
		exitNano(true);
	} 
	else if (event.ctrlKey && event.key.toLowerCase() === "o") {
		event.preventDefault();
		saveNanoContent();
	}
	else if (event.ctrlKey && event.key.toLowerCase() === "c") {
		event.preventDefault();
		exitNano(false);
	}
}

function saveNanoContent() {
	if (!isNanoActive || !nanoCurrentFile) return;
	
	const filePathParts = nanoCurrentFile.split("/").filter(p => p);
	let current = fileStructure["/"];
	
	if (nanoCurrentFile === "/") return;
	
	for (let i = 0; i < filePathParts.length - 1; i++) {
		if (!current[filePathParts[i]]) return;
		current = current[filePathParts[i]];
	}
	
	const fileName = filePathParts[filePathParts.length - 1];
	if (current[fileName]) {
		current[fileName].content = nanoContent;
		localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
		
		const statusMessage = document.createElement("div");
		statusMessage.className = "nano-status";
		statusMessage.textContent = `File "${nanoCurrentFile}" saved`;
		document.getElementById("nano-editor").insertBefore(statusMessage, document.getElementById("nano-editor").lastChild);
		
		setTimeout(() => {
			if (document.querySelector(".nano-status")) {
				document.querySelector(".nano-status").remove();
			}
		}, 2000);
	}
}

function exitNano(askSave = false) {
	if (!isNanoActive) return;
	
	if (askSave && nanoContent !== getPathObject(nanoCurrentFile).content) {
		const nanoEditor = document.getElementById("nano-editor");
		
		const savePrompt = document.createElement("div");
		savePrompt.className = "nano-prompt";
		savePrompt.innerHTML = `Save modified buffer (ANSWERING "No" WILL DESTROY CHANGES) ? <br>
		<span class="key">Y</span> Yes
		<span class="key">N</span> No
		<span class="key">^C</span> Cancel`;
		
		nanoEditor.appendChild(savePrompt);
		
		const promptHandler = function(e) {
			if (e.key.toLowerCase() === "y") {
				saveNanoContent();
				cleanupNano();
			} 
			else if (e.key.toLowerCase() === "n") {
				cleanupNano();
			} 
			else if (e.key === "Escape" || (e.ctrlKey && e.key.toLowerCase() === "c")) {
				savePrompt.remove();
				document.removeEventListener("keydown", promptHandler);
			}
		};
		
		document.addEventListener("keydown", promptHandler);
	} else {
		cleanupNano();
	}
}

function cleanupNano() {
	document.removeEventListener("keydown", handleNanoKeydown);
	
	isNanoActive = false;
	nanoCurrentFile = null;
	
	outputs.innerHTML = "";
	commandLine.style.display = 'flex';
	updatePrompt();
	document.getElementById("commandInput").focus();
}

boot();