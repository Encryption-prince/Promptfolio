let terminal;
let ResumeTab;
let content;
let terminalAPP;

function on_load() {
  terminal = document.getElementById("Terminal");
  terminal.style.display = "none"
  ResumeTab = document.getElementById("ResumeTab");
  ResumeTab.style.display = "none"
  ResumeTab.classList.add("maxed");
  content = document.getElementById("Content");
  terminalAPP = document.getElementById("app");
  AvButtons = document.getElementById("Buttons");
  AppIcon = document.getElementById("AppIcon");

  terminal.getElementsByTagName("form")[0].onsubmit = function () {
    command_handler(terminal.getElementsByTagName("input")[0].value);
    terminal.getElementsByTagName("input")[0].value = "";
    return false;
  };
}

projects = {
  "<br><span class = 'project'>> Portfolio Terminal</span><br><span class = 'projectdes'>A terminal that shows your work</span>":
    "https://github.com/subh05sus/Terminal-Portfolio",
  "<span class = 'project'>> DevSnake</span><br><span class = 'projectdes'>A 2D Classic Snake Game but for developers</span>":
    "https://github.com/subh05sus/DevSnake",
  "<span class = 'project'>> YourMedic</span><br><span class = 'projectdes'>A virtual 3D doctor that suggest you cures with natural human-like facial expressions</span>":
    "https://github.com/MenOfCultureSS0/YourMedic",
  "<span class = 'project'>> GeetaGPT</span><br><span class = 'projectdes'>GPT powered AI that mimics like Lord Krishna</span>":
    "https://geeta-gpt.onrender.com/",
  "<span class = 'project'>> MeowGPT</span><br><span class = 'projectdes'>Fun GPT project that acts like a cat. Meow Meow</span>":
    "https://meow-gpt.onrender.com/",
  "<span class = 'project'>> Project Suzume</span><br><span class = 'projectdes'>A 3D open world game based on Suzume No Tojimari</span>":
    "https://github.com/subh05sus/Project-Suzume",
  "<span class = 'project'>> BlockRush</span><br><span class = 'projectdes'>A simple 3D infinite block game</span>":
    "https://github.com/subh05sus/BlockRush",
  "<span class = 'project'>> Anya Run</span><br><span class = 'projectdes'>A 3D runner game based on anime character Anya Forger from SpyXFamily Anime</span>":
    "https://github.com/subh05sus/Anya-3D-Runner-Game",
  "<span class = 'project'>> Python Voice Assistant</span><br><span class = 'projectdes'>An open-source project featured in SWOC'23</span>":
    "https://github.com/subh05sus/Python-Voice-Assistant",
};

links = {
  "<br>➤ Github": "https://github.com/Encryption-prince",
  "➤ LinkedIn": "https://www.linkedin.com/in/subham-maity-6196aa248/",
  "➤ Instagram": "https://www.instagram.com/ursmile_makesmy_day/?next=%2F",
};

function command_handler(command) {
  content.innerHTML += "<br><span class = 'dollar'>$ </span>" + command + "<br>";
  switch (command.toLowerCase()) {
    case "help":
      help(content);
      break;
    case "clear":
      clear(content);
      break;
    case "social links":
      for (let e in links) {
        content.innerHTML += `<a href="${links[e]}">${e}</a><br>`;
      }
      break;
    case "my projects":
      for (let e in projects) {
        content.innerHTML += `<a href="${projects[e]}">${e}</a><br>`;
      }
      break;
    case "exit":
      const shouldClose = confirm(
        "Are you sure you want to exit the terminal?"
      );
      if (shouldClose) {
        window.close();
      }
      break;

    case "ls":
      content.innerHTML += `
      <br>
      <table class="file-list">
        <thead>
          <tr>
            <th>Command</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Help</td>
            <td>Get commands list</td>
          </tr>
          <tr>
            <td>My projects</td>
            <td>View my projects</td>
          </tr>
          <tr>
            <td>Social Links</td>
            <td>Get my Social Links</td>
          </tr>
          <tr>
            <td>ls</td>
            <td>List all the available commands for this terminal</td>
          </tr>
          <tr>
            <td>Github</td>
            <td>Check out my Github Stats</td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>Get details to reach me out</td>
          </tr>
          <tr>
            <td>clear</td>
            <td>Clean the terminal and have a fresh look</td>
          </tr>
        </tbody>
      </table>
      <br>`;
      break;


    case "contact":
      content.innerHTML += "<br>Contact Information:<br>";
      content.innerHTML +=
        "<br>Email: <a href='mailto:subhammaity6827@gmail.com'>subhammaity6827@gmail.com</a><br>";
      break;


    case "github":
      const githubUsername = "Encryption-prince"; // Replace with your GitHub username
      fetch(`https://api.github.com/users/${githubUsername}`)
        .then((response) => response.json())
        .then((user) => {
          fetch(`https://api.github.com/users/${githubUsername}/repos`)
            .then((response) => response.json())
            .then((repos) => {
              const totalRepos = repos.length + 4;
              const totalStars = repos.reduce(
                (sum, repo) => sum + repo.stargazers_count,
                0
              );
              const totalForks = repos.reduce(
                (sum, repo) => sum + repo.forks_count,
                0
              );
              const totalIssues = repos.reduce(
                (sum, repo) => sum + repo.open_issues_count,
                0
              );
              content.innerHTML += `<br>GitHub Stats for <span class = username> ${githubUsername}</span>:<br>`;
              content.innerHTML += `Total Repositories: ${totalRepos}<br>`;
              content.innerHTML += `Total Stars Received: ${totalStars}<br>`;
              content.innerHTML += `Total Forks: ${totalForks}<br>`;
              content.innerHTML += `Total Open Issues: ${totalIssues}<br><br>`;

              const contributionsURL = `https://api.github.com/users/${githubUsername}/events/public`;
              fetch(contributionsURL)
                .then((response) => response.json())
                .then((data) => {
                  const contributions = data.filter(
                    (event) => event.type === "PushEvent"
                  );
                  content.innerHTML +=
                    "<br>My Recent GitHub Contributions:<br>";
                  for (let i = 0; i < Math.min(5, contributions.length); i++) {
                    const event = contributions[i];
                    const repoName = event.repo.name;
                    const commitCount = event.payload.commits.length;
                    const commitPlural = commitCount > 1 ? "commits" : "commit";
                    const commitMessage = event.payload.commits[0].message;
                    const commitDate = new Date(
                      event.created_at
                    ).toDateString();
                    const branchName = event.payload.ref.replace(
                      "refs/heads/",
                      ""
                    );
                    content.innerHTML += `<br><p>Repository: <a href="https://github.com/${repoName}">${repoName}</a>`;
                    content.innerHTML += `Commits: ${commitCount} ${commitPlural}<br>`;
                    content.innerHTML += `Latest Commit: ${commitMessage}<br>`;
                    content.innerHTML += `Date: ${commitDate}</p>`;
                  }
                })
                .catch((error) => {
                  content.innerHTML +=
                    "<br>Error fetching GitHub contributions. Please try again later.</br>";
                });
            })
            .catch((error) => {
              content.innerHTML +=
                "<br>Error fetching GitHub repository information. Please try again later.</br>";
            });
        })
        .catch((error) => {
          content.innerHTML +=
            "<br>Error fetching GitHub user information. Please try again later.</br>";
        });
      break;


    //   default:
    //     if (command.toLowerCase().startsWith("echo ")) {
    //       const message = command.substring(5);
    //       content.innerHTML += `<br>${message}<br>`;
    //     } else if (command.toLowerCase().startsWith("cowsay ")) {
    //       const message = command.substring(7);
    //       const cowTemplate = `
    //         <pre>
    //  \\   ^__^
    //   \\  (oo)\\_______
    //      (__)\\       )\\/\\
    //          ||----w |
    //          ||     ||
    //       </pre>
    //       <pre>${generateSpeechBubble(message)}</pre>
    //       `;
    //       content.innerHTML += cowTemplate;
    //     } else if (command.toLowerCase().startsWith("calc ")) {
    //       const expression = command.substring(5);
    //       try {
    //         const result = eval(expression);
    //         content.innerHTML += `<br>Result: ${result}<br>`;
    //       } catch (error) {
    //         content.innerHTML += `<br>Error: Invalid expression<br>`;
    //       }
    //     } else if (command.toLowerCase().startsWith("weather ")) {
    //       const city = command.substring(8);
    //       const apiKey = "9c844659384b665e24decd4c6cce52f7"; // Replace with your actual API key

    //       // Fetch weather data and display it
    //       fetch(
    //         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    //       )
    //         .then((response) => response.json())
    //         .then((data) => {
    //           const weatherDescription = data.weather[0].description;
    //           const temperature = data.main.temp;
    //           const humidity = data.main.humidity;
    //           const city = data.name;

    //           const weatherInfo = `
    //             Weather in ${city}: ${weatherDescription}<br>
    //             Temperature: ${temperature}°C<br>
    //             Humidity: ${humidity}%
    //           `;

    //           content.innerHTML += `<br>${weatherInfo}<br>`;
    //         })

    //         .catch((error) => {
    //           content.innerHTML +=
    //             "<br>Failed to fetch weather data. Please try again later.<br>";
    //           console.error(error);
    //         });
    //     } else {
    //       content.innerHTML += "Error: Unknown command. Try help<br>";
    //     }
    default: content.innerHTML += "No such command known. Try Help <br>";
  }
  terminal.scroll(0, terminal.scrollHeight);
}

function clear(console) {
  console.innerHTML = "";
}

function help(console) {
  console.innerHTML +=
    "<br>List of commands<br><br>" +
    "help - Get Command List<br>" +
    "my projects - List out my projects<br>" +
    "social links - Links to contact me or see things I have done<br>" +
    "ls - List out files<br>" +
    "github - Open my GitHub profile<br>" +
    "contact - Get my contact information<br>" +
    "clear - Clear the screen<br>";
}

let prevLeftHide, prevTopHide; // Store previous top and left values for Hide

function Hide() {
  if (!terminal.classList.contains("hidden")) {
    prevLeftHide = terminal.style.left; // Store previous left value
    prevTopHide = terminal.style.top; // Store previous top value

    if (!(ResumeTab.style.display == 'none') && ResumeTab.classList.contains("hidden")) {
      terminal.style.left = '21.5%';
    } else {

      terminal.style.left = "0";
    } terminal.style.top = "10%";

    if (terminal.classList.contains("maxed")) {
      terminal.classList.remove("maxed");
    }

    terminal.classList.add("hidden");
    AppIcon.classList.add("appMin");

    setTimeout(function () {
      AppIcon.classList.remove("appMin");
    }, 500);

    terminalAPP.style.display = "initial"; // Show the app button
  } else {
    if (!(ResumeTab.style.display == 'none') && ResumeTab.classList.contains("hidden") && (ResumeTab.style.left == '21.5%')) {
      ResumeTab.style.left = '0';
    }
    terminal.style.left = prevLeftHide; // Restore previous left value
    terminal.style.top = prevTopHide; // Restore previous top value

    terminal.classList.remove("hidden");
  }
}


let prevLeft, prevTop; // Store previous top and left values

function Maxim() {
  if (!terminal.classList.contains("maxed")) {
    prevLeft = terminal.style.left; // Store previous left value
    prevTop = terminal.style.top; // Store previous top value

    terminal.style.left = "0";
    terminal.style.top = "0";

    if (terminal.classList.contains("hidden")) {
      terminal.classList.remove("hidden");

      if ((ResumeTab.classList.contains("hidden")) && (ResumeTab.style.left == '21.5%')) {
        ResumeTab.style.left = "0";
      }
    }

    terminal.classList.add("maxed");
  } else {
    terminal.style.left = prevLeft; // Restore previous left value
    terminal.style.top = prevTop; // Restore previous top value

    terminal.classList.remove("maxed");
  }
}


function AppOpen() {
  terminal.style.top = '16%';
  terminal.style.left = '16%';
  if (!terminal.classList.contains("hidden") && !(terminal.style.display == "none")) {
    terminal.classList.add("shake");

    setTimeout(function () {
      terminal.classList.remove("shake");
    }, 500);


  }
  if (terminal.classList.contains("hidden")) {
    terminal.classList.remove("hidden");
  }

  if (terminal.style.display == "none") {
    terminal.classList.add("opening");

    setTimeout(() => {
      terminal.classList.remove("opening");
    }, 500);
    terminal.style.display = "block";
  }
}

function closeT() {
  content.innerHTML = "";
  terminal.classList.add("closing");
  if ((ResumeTab.classList.contains("hidden")) && (ResumeTab.style.left == '21.5%')) {
    ResumeTab.style.left = "0";
  }
  setTimeout(() => {
    terminal.style.display = "none";
    terminal.classList.remove("closing");
  }, 500);
}


let isDragging = false;

let initialX, initialY, offsetX, offsetY;

function handleMouseDown(event) {
  if (
    !terminal.classList.contains("hidden") &&
    !terminal.classList.contains("maxed")
  ) {
    isDragging = true;
    terminal.style.transition = "none";
    terminal.style.zIndex = "1000";
    terminal.style.cursor = "grabbing";

    initialX = event.clientX;
    initialY = event.clientY;

    const rect = terminal.getBoundingClientRect();
    offsetX = initialX - rect.left;
    offsetY = initialY - rect.top;
  }
}

function handleMouseMove(event) {
  if (
    !terminal.classList.contains("hidden") &&
    !terminal.classList.contains("maxed")
  ) {
    if (!isDragging) return;

    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;

    // Calculate the boundaries of the screen
    const maxX = window.innerWidth - terminal.offsetWidth;
    const maxY = window.innerHeight - terminal.offsetHeight;

    // Clamp the terminal position to stay within the screen boundaries
    const clampedX = Math.max(0, Math.min(x, maxX));
    const clampedY = Math.max(0, Math.min(y, maxY));

    terminal.style.left = `${clampedX}px`;
    terminal.style.top = `${clampedY}px`;
  }
}


function handleMouseUp() {
  if (
    !terminal.classList.contains("hidden") &&
    !terminal.classList.contains("maxed")
  ) {
    if (isDragging) {
      isDragging = false;
      terminal.style.transition = ""; // Re-enable transitions
      terminal.style.cursor = "grab"; // Reset cursor
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  terminal = document.getElementById("Terminal");
  const terminalHeader = terminal.querySelector(".Buttons");

  terminalHeader.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

});











function OpenStandardPortfolio() {
  var userConfirmed = confirm("Do you want to proceed to my portfolio website?");

  if (userConfirmed) {
    window.open("")
  } else {
    alert("Also this terminal has my portfolio Do check out the commands in the terminal");
  }

}



function HideResumeTab() {

  if (!ResumeTab.classList.contains("hidden")) {
    prevLeftHide = ResumeTab.style.left; // Store previous left value
    prevTopHide = ResumeTab.style.top; // Store previous top value

    if (!(terminal.style.display == 'none') && terminal.classList.contains("hidden")) {
      ResumeTab.style.left = '21.5%';
    } else {

      ResumeTab.style.left = "0";
    }
    ResumeTab.style.top = "10%";

    if (ResumeTab.classList.contains("maxed")) {
      ResumeTab.classList.remove("maxed");
    }

    ResumeTab.classList.add("hidden");
    AppIcon2.classList.add("appMin");

    setTimeout(function () {
      AppIcon2.classList.remove("appMin");
    }, 500);

    ResumeTabAPP.style.display = "initial"; // Show the app button
  } else {
    ResumeTab.style.left = 0;
    ResumeTab.style.top = 0;
    if ((terminal.classList.contains("hidden")) && (terminal.style.left == '21.5%')) {
      terminal.style.left = "0";
    }
    ResumeTab.classList.remove("hidden");
    ResumeTab.classList.add("maxed");
  }
}




function AppOpenResumeTab() {
  ResumeTab.classList.add("maxed");
  if (!(terminal.style.display == 'none') && !(terminal.classList.contains("hidden"))) {
    ResumeTab.style.zIndex = "100";
  }
  ResumeTab.style.left = "0";
  ResumeTab.style.top = "0";
  if (!ResumeTab.classList.contains("hidden") && !(ResumeTab.style.display == "none")) {
    ResumeTab.classList.add("shake");

    setTimeout(function () {
      ResumeTab.classList.remove("shake");
    }, 500);


  }
  if (ResumeTab.classList.contains("hidden")) {
    ResumeTab.classList.remove("hidden");
  }

  if (ResumeTab.style.display == "none") {
    ResumeTab.classList.add("opening");

    setTimeout(() => {
      ResumeTab.classList.remove("opening");
    }, 500);
    ResumeTab.style.display = "block";
  }
}

function closeResumeTab() {
  content.innerHTML = "";
  ResumeTab.classList.add("closing");
  if ((terminal.classList.contains("hidden")) && (terminal.style.left == '21.5%')) {
    terminal.style.left = "0";
  }
  setTimeout(() => {
    ResumeTab.style.display = "none";
    ResumeTab.classList.remove("closing");
  }, 500);
}










