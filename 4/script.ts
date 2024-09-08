document.getElementById("resumeForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const profilePictureInput = document.getElementById("profileImage") as HTMLInputElement
    const nameElement = document.getElementById("name") as HTMLInputElement | null;
    const emailElement = document.getElementById("email") as HTMLInputElement | null;
    const phoneElement = document.getElementById("phone") as HTMLInputElement | null;
    const educationElement = document.getElementById("education") as HTMLTextAreaElement | null;
    const experienceElement = document.getElementById("experience") as HTMLTextAreaElement | null;
    const skillsElement = document.getElementById("skills") as HTMLTextAreaElement | null;

    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const profileFile = profilePictureInput.files?.[0];
        const profilePictureURL = profileFile ? URL.createObjectURL(profileFile) : "";
        // Create resume output
        const resumeOutput = `
        <h2>Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture"class:"ProfilePicture">` : ""}
        <p><strong>Name:</strong> <span class="editable" id="editname" >${name}</span></p>
        <p><strong>Email:</strong> <span class="editable" id="editemail" >${email}</span></p>
        <p><strong>Phone:</strong> <span class="editable" id="editphone" >${phone}</span></p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Skills:</strong> ${skills}</p>
        `;

        const resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();
        } else {
            console.error("Element with ID 'resumeOutput' not found");
        }
    } else {
        console.error("One or more input elements are missing");
    }
});
function makeEditable(){
    const editableElements = document.querySelectorAll(".editable");
    editableElements.forEach((element) => {
        element.addEventListener("click", () => {
            const inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.value = element.textContent || "";
            element.textContent = "";
            element.appendChild(inputElement);
            inputElement.focus();
            inputElement.addEventListener("blur", () => {
                element.textContent = inputElement.value;
                inputElement.remove();
            });
        });
    });
}
