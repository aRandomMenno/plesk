let fileStructure = {
	"/": {
		"bin": {
			"adduser": {
				".type": "executable",
				"description": "Add a new user to the system.",
			},
			"calc": {
				".type": "executable",
				"description": "Calculator application.",
			},
			"cat": {
				".type": "executable",
				"description": "Shows the content of a file.",
			},
			"cd": {
				".type": "executable",
				"description": "Change the current working directory.",
			},
			"clear": {
				".type": "executable",
				"description": "Clear the terminal screen.",
			},
			"cp": {
				".type": "executable",
				"description": "Copy files or directories.",
			},
			"deluser": {
				".type": "executable",
				"description": "Delete a user from the system.",
			},
			"exit": {
				".type": "executable",
				"description": "Exit the terminal. (borked)",
			},
			"help": {
				".type": "executable",
				"description": "Displays all commands available in the terminal. (there are hidden ones)",
			},
			"history": {
				".type": "executable",
				"description": "Shows the history of commands used in the terminal.",
			},
			"ls": {
				".type": "executable",
				"description": "Shows all files and folder in the current directory.",
			},
			"mkdir": {
				".type": "executable",
				"description": "Creates a new directory.",
			},
			"mv": {
				".type": "executable",
				"description": "Moves files or directories.",
			},
			"nano": {
				".type": "executable",
				"description": "Easily edit any text file.",
			},
			"open-gui": {
				".type": "executable",
				"description": "Open the GUI of GooberOS.",
			},
			"prompt": {
				".type": "executable",
				"description": "Change the terminal prompt format. Use {user} for username, {dir} for current directory.",
			},
			"pwd": {
				".type": "executable",
				"description": "Print the current working directory.",
			},
			"reboot": {
				".type": "executable",
				"description": "Reboot the system.",
			},
			"recls": {
				".type": "executable",
				"description": "Clear local storage and refresh the page. (for testing)",
			},
			"rm": {
				".type": "executable",
				"description": "Remove files or directories.",
			},
			"rmdir": {
				".type": "executable",
				"description": "Remove a directory.",
			},
			"run": {
				".type": "executable",
				"description": "Run programs or games, see them with `run list`. (calculator, minesweeper...)",
			},
			"shutdown": {
				".type": "executable",
				"description": "Shuts down GooberOS.",
			},
			"su": {
				".type": "executable",
				"description": "Login to another user.",
			},
			"team": {
				".type": "executable",
				"description": "Shows the team behind GooberOS.",
			},
			"touch": {
				".type": "executable",
				"description": "Creates a new file.",
			},
			"version": {
				".type": "executable",
				"description": "Shows the current version of GooberOS.",
			},
			"users": {
				".type": "executable",
				"description": "Shows a list off all users on the system.",
			},
			"whoami": {
				".type": "executable",
				"description": "Shows the user you are logged in as.",
			},
		},
		"etc": {
			"hostname": {
				"content": "GooberOS-terminal",
				".type": "file"
			},
			".type": "directory"
		},
		"var": {
			"log": {
				"system.log": {
					"content": "System started\nUser \"user\" logged in",
					".type": "file"
				},
				"commands.log": {
					"content": "ls|cd /home/user|touch myTestFile.txt|rm myTestFile.txt",
					".type": "file"
				},
				".type": "directory"
			},
			".type": "directory"
		},
		"home": {
			"guest": {
				"documents": {
					"welcome.txt": {
						"content": "Welcome to the guest account!",
						".type": "file"
					}
				},
				"downloads": {
					".type": "directory"
				},
				"desktop": {
					".type": "directory"
				},
				"music": {
					".type": "directory"
				},
				"pictures": {
					".type": "directory"
				},
				"videos": {
					".type": "directory"
				},
				".type": "directory"
			},
			"jea": {
				"documents": {
					"note.txt": {
						"content": "Sleep early, and code all night!<br>Then sleep 3 code the rest of the day!",
						".type": "file"
					},
					"hacknet.txt": {
						"content": "Play <a href='https://store.steampowered.com/app/365450/Hacknet/' target=\"_blank\">hacknet</a>, it's a great game! ",
						".type": "file"
					},
					"letter.docx": {
						"content": "Dear friend,<br>How are you doing? I hope you are doing well!<br>I wanted to tell you about my new project I'm working on. It's a terminal emulator and a Windows 95 like GUI named GooberOS!<br>I'm really excited about it, and I can't wait to show it to you!<br>Best regards,<br>Jea",
						".type": "file"
					},
					".type": "directory"
				},
				"downloads": {
					"gleeby.png": {
						"content": "<img src='./assets/media/gleeby.png' alt='image'>",
						".type": "file"
					},
					"photos.zip": {
						"content": "01011001 01101111 01110101 00100000 01100001 01100011 01110100 01110101 01100001 01101100 01101100 01111001 00100000 01110011 01110000 01100101 01101110 01110100 00100000 01110100 01101001 01101101 01100101 00100000 01100100 01100101 01100011 01101111 01100100 01101001 01101110 01100111 00100000 01110100 01101000 01101001 01110011 00101100 00100000 01101000 01110101 01101000 00111111 00100000 01010111 01100101 01101100 01101100 00100000 01001001 00100000 01100111 01110101 01100101 01110011 01110011 00100000 01111001 01101111 01110101 00100000 01100011 01100001 01101110 00100000 01110000 01100001 01110100 00100000 01111001 01101111 01110101 01110010 01110011 01100101 01101100 01100110 00100000 01101111 01101110 00100000 01111001 01101111 01110101 01110010 00100000 01100010 01100001 01100011 01101011 00100001 00100000 01001001 00100000 01101000 01100001 01110110 01100101 00100000 01101110 01101111 01110100 01101000 01101001 01101110 01100111 00100000 01100110 01101111 01110010 00100000 01111001 01101111 01110101 00101110 00101110 00101110",
						".type": "file"
					},
					".type": "directory"
				},
				"desktop": {
					"steam.lnk": {
						"content": "/bin/steam",
						".type": "file"
					},
					"discord.lnk": {
						"content": "/bin/discord",
						".type": "file"
					},
					"hacknet.lnk": {
						"content": "/bin/hacknet",
						".type": "file"
					},
					"vscode.lnk": {
						"content": "/bin/vscode",
						".type": "file"
					},
					"phpstorm.lnk": {
						"content": "/bin/phpstorm",
						".type": "file"
					},
					"projects": {
						"very-scary-game": {
							"content": "This is a very scary game!<br>It is so scary that I can't even play it!<br>I'm too scared to play it!",
							".type": "file"
						},
						".type": "directory"
					},
					".type": "directory"
				},
				"music": {
					".type": "directory"
				},
				"pictures": {
					"gooberOS.png": {
						"content": "<img src='./desktop/media/backgroundimages/w95bckgrnd.jpg' alt='Goober OS background' height='200'>",
						".type": "file"
					},
					".type": "directory"
				},
				"videos": {
					".type": "directory"
				},
				".type": "directory"
			},
			"menno": {
				"documents": {
					"diary": {
						"tuesday.txt": {
							"content": "Today the make-a-thon started!<br>I'm so excited to work on this project with my friends! <br>We are going to make a terminal emulator and a Windows 95 like GUI named GooberOS!<br>We are going to make it look like a real OS, and I can't wait to see the results!",
							".type": "file"
						},
						"wednesday.txt": {
							"content": "Yesterday we did a lot of work on the project!<br>We made a lot of progress, and I'm really happy with the results!<br>We are like 80% done!",
							".type": "file"
						},
						"thursday.txt": {
							"content": "This night at around ~05:30 am my sister was working on the project, and she was so tired that she fell asleep on her keyboard!<br>She was woken up by one of the other team members at ~8:30am when we were supposed to switch working shifts.",
							".type": "file"
						},
						".type": "directory"
					},
					"notes.txt": {
						"content": "Update all apps on system every 7 days.",
						".type": "file"
					},
					"games.txt": {
						"content": "Games I like to play include: <span class=\"games-menno\">Minecraft, Terraria, Noita, BOPL Battle, and more!</span>",
						".type": "file"
					},
					".type": "directory"
				},
				"downloads": {
					"minecraft.jar": {
						"content": "10101001010101010011110100101001101001101010111000111001101010101001010111001001101011010111001000110101100010100011010111010101010101100101010010101001010111000110011010010101001010",
						".type": "file"
					},
					".type": "directory"
				},
				"desktop": {
					".type": "directory"
				},
				"music": {
					".type": "directory"
				},
				"pictures": {
					".type": "directory"
				},
				"videos": {
					".type": "directory"
				},
				".type": "directory"
			},
			"rianne": {
				"documents": {
					".type": "directory"
				},
				"downloads": {
					".type": "directory"
				},
				"desktop": {
					".type": "directory"
				},
				"music": {
					".type": "directory"
				},
				"pictures": {
					".type": "directory"
				},
				"videos": {
					".type": "directory"
				},
				".type": "directory"
			},
			"stone": {
				"documents": {
					".type": "directory"
				},
				"downloads": {
					".type": "directory"
				},
				"desktop": {
					".type": "directory"
				},
				"music": {
					".type": "directory"
				},
				"pictures": {
					".type": "directory"
				},
				"videos": {
					".type": "directory"
				},
				".type": "directory"
			},
			"tigo": {
				"documents": {
					".type": "directory"
				},
				"downloads": {
					".type": "directory"
				},
				"desktop": {
					".type": "directory"
				},
				"music": {
					".type": "directory"
				},
				"pictures": {
					".type": "directory"
				},
				"videos": {
					".type": "directory"
				},
				".type": "directory"
			},
			"user": {
				"documents": {
					"welcome.txt": {
						"content": "This is the account of the normal user!",
						".type": "file"
					},
					".type": "directory"
				},
				"downloads": {
					".type": "directory"
				},
				"desktop": {
					".type": "directory"
				},
				"music": {
					".type": "directory"
				},
				"pictures": {
					".type": "directory"
				},
				"videos": {
					".type": "directory"
				},
				"projects": {
					"notes.txt": {
						"content": "Ideas for my next project: Terminal emulator, Retro file browser, Simple text editor",
						".type": "file"
					},
					".type": "directory"
				},
				"hidden.txt": {
					"content": "This is a hidden file with important information.",
					".ghost": true,
					".type": "file"
				},
				"test.txt": {
					"content": "This is a test to see if colored labels work in the `ls` command.",
					".type": "file"
				},
				"squared-away.txt": {
					"content": "Hidden and locked file. You can only see this message with root privileges.",
					".lock": true,
					".ghost": true,
					".type": "file"
				},
				"super-secret-message.txt": {
					"content": "You can only see this message with root privileges.",
					".lock": true,
					".type": "file"
				},
				".type": "directory"
			},
		},
		
		"root": {
			"secret.txt": {
				"content": "System password: root",
				".lock": true,
				".type": "file"
			},
			"welcome.txt": {
				"content": "This is the home directory root account, and has all permissions!",
				".lock": true,
				".type": "file"
			},
			".type": "directory",
			".lock": true,
		},
		"tmp": {
			"temp": {
				"content": "Temporary data... Nothing special here. maybe the system admin is hiding something though. Ngl, don't know, don't care.",
				".type": "file"
			},
			".type": "directory"
		},
		"artifact": "Hi, user. If you have used the inspector to get here, you failed the test. I wanted to add a small secret, which is this, if you have been able to read out this file using only terminal commands, no browser extension, no inspector or other tools, You won. :) give yourself a pat on the back.",
		".type": "directory"
	}
}