document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOGIN PAGE LOGIC ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('userName').value;
            alert(`Welcome, ${name}! Let the learning begin!`);
            window.location.href = "search.html"; 
        });
    }

    // --- 2. SEARCH PAGE LOGIC ---
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('keyup', function() {
            const query = searchBar.value.toLowerCase();
            const cards = document.querySelectorAll('.skill-card');
            cards.forEach(card => {
                const title = card.querySelector('.skill-title').innerText.toLowerCase();
                card.style.display = title.includes(query) ? "block" : "none";
            });
        });
    }

    // --- 3. DYNAMIC COURSE PAGE LOGIC (THE NEW BRAIN) ---
    const compilerFrame = document.getElementById('compilerFrame');
    
    // If the compiler frame exists, we know we are on course.html
    if (compilerFrame) {
        
        // Find out which course was clicked by checking the URL (e.g., ?course=python)
        const urlParams = new URLSearchParams(window.location.search);
        let currentCourse = urlParams.get('course');
        
        // If they just opened the file directly, default to 'c'
        if (!currentCourse) currentCourse = 'c';

        // --- THE COURSE DATABASE ---
        const courseData = {
            "c": {
                title: "Problem Solving in C",
                compilerUrl: "https://onecompiler.com/embed/c",
                lessons: [
                    {
                        stepName: "Step 1: Hello World",
                        title: "Printing to the Screen",
                        text: "In C programming, we use a built-in function called <code>printf()</code> to display text. Every program must have a <code>main()</code> function. <br><br><strong>Try it:</strong> Type <code>printf(\"Hello World\");</code> in the editor below and hit Run!"
                    },
                    {
                        stepName: "Step 2: Variables",
                        title: "Storing Data in C",
                        text: "Variables in C need a specific 'type' declared before you use them. For example: <br><br><code>int age = 20;</code> <br><code>float pi = 3.14;</code> <br><br><strong>Try it:</strong> Create an integer variable in the editor below."
                    },
                    {
                        stepName: "Step 3: Loops",
                        title: "Repeating Code",
                        text: "The <code>for</code> loop lets you run code multiple times. <br><br><code>for(int i = 0; i < 5; i++) { ... }</code> <br><br>This will run the code block 5 times, counting from 0 to 4."
                    }
                ]
            },
            "python": {
                title: "Python for Beginners",
                compilerUrl: "https://onecompiler.com/embed/python",
                lessons: [
                    {
                        stepName: "Step 1: Hello World",
                        title: "The Simple print() Function",
                        text: "Python is known for being incredibly readable. To show text on the screen, you just use the <code>print()</code> function. No main function required! <br><br><strong>Try it:</strong> Type <code>print(\"Hello Python\")</code> below and hit Run."
                    },
                    {
                        stepName: "Step 2: Variables",
                        title: "Dynamic Typing",
                        text: "Unlike C, Python is dynamically typed. You do not need to tell it what kind of data you are storing; it just figures it out! <br><br><code>age = 20</code> <br><code>name = \"Anugrah\"</code>"
                    },
                    {
                        stepName: "Step 3: Lists",
                        title: "Storing Multiple Items",
                        text: "A List in Python allows you to store multiple items in a single variable. <br><br><code>fruits = [\"apple\", \"banana\", \"cherry\"]</code> <br><br>You can print the whole list easily!"
                    }
                ]
            }
        };

        // Get the specific data for the chosen course
        const data = courseData[currentCourse];

        // 1. Set the Title and Compiler URL
        document.getElementById('courseTitle').innerText = data.title;
        compilerFrame.src = data.compilerUrl;

        // 2. Build the Sidebar Buttons Dynamically
        const sidebarContainer = document.getElementById('sidebarSteps');
        sidebarContainer.innerHTML = ''; // Clear it out first

        data.lessons.forEach((lesson, index) => {
            // Create a new visual button for each step
            const stepDiv = document.createElement('div');
            stepDiv.className = 'step-card';
            if (index === 0) stepDiv.classList.add('active'); // Make the first one active by default
            
            stepDiv.innerHTML = `<h4>${lesson.stepName}</h4>`;
            
            // 3. Make the buttons work when clicked!
            stepDiv.addEventListener('click', () => {
                // Remove the glowing 'active' color from all buttons
                document.querySelectorAll('.step-card').forEach(card => card.classList.remove('active'));
                
                // Add the glowing color to the exact button just clicked
                stepDiv.classList.add('active');
                
                // Change the main text to match the clicked lesson
                document.getElementById('lessonTitle').innerText = lesson.title;
                document.getElementById('lessonContent').innerHTML = lesson.text;
            });

            sidebarContainer.appendChild(stepDiv);
        });

        // 4. Force the first lesson to load on the screen immediately
        document.getElementById('lessonTitle').innerText = data.lessons[0].title;
        document.getElementById('lessonContent').innerHTML = data.lessons[0].text;
    }
});
// This function is triggered when you click a course card
function startCourse(courseName) {
    // You can replace this later with code that opens a new page
    alert("Awesome choice! You selected: " + courseName + ".\n\nThe course content will be loaded here soon.");
}