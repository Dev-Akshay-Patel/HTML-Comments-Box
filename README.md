# Minimal Comments

A free, lightweight, and modern comment system for websites and blogs. Built with vanilla JavaScript, responsive by default, and easy to integrate into any project.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success.svg)

## Features

- Clean and minimal user interface
- Fully responsive design
- Threaded replies
- Pinned comments
- Comment sorting (Newest / Oldest)
- Toast notifications
- Built-in profanity filtering
- Lightweight and fast
- Easy integration
- No frameworks required

## Demo

<img width="964" height="480" alt="image" src="https://github.com/user-attachments/assets/511a423f-9a50-42fb-be0a-ec29759ac63f" />
<img width="1372" height="888" alt="image" src="https://github.com/user-attachments/assets/44be3dba-c2b5-46e3-b9fa-4802cd1fb6bb" />

Live Demo: https://dev-akshay-patel.github.io/HTML-Comments-Box/

## Installation

### 1. Download the files

Clone the repository:

```bash
git clone https://github.com/Dev-Akshay-Pate/HTML-Comments-Box.git
```

### 2. Include the stylesheets

```html
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="toasts.css">
```

### 3. Add the comment trigger button

```html
<button class="comment-trig-end-post comment-box-mld">
  Join the Conversation
</button>
```

### 4. Add the comment modal

Copy the comment modal markup from the project example into your page.

### 5. Include the scripts

```html
<script src="toasts.js"></script>
<script src="script.js"></script>
```

## Storing Comments

This system uses Google Apps Script to store comments for your website. Follow these steps:

**Step 1:** Go to Google Sheets and click on Blank Spreadsheet.

<img width="1540" height="232" alt="image" src="https://github.com/user-attachments/assets/6c894056-7be8-46bb-b9b5-4526ebd13829" />

**Step 2:** Click the + button to create a new sheet and name it 'settings'.

<img width="115" height="103" alt="image" src="https://github.com/user-attachments/assets/79b0caa7-d1ca-45ea-be9e-1cc80e2cd059" />

**Step 3:** Name the columns in the settings sheet. Use "true" to allow new comments or "false" to stop them.

<img width="898" height="43" alt="image" src="https://github.com/user-attachments/assets/5b8c6a4d-8aa2-4147-b454-16ca8d9c3bcd" />

**Step 4:** Click on Extensions and select Apps Script.

<img width="548" height="61" alt="image" src="https://github.com/user-attachments/assets/1ad0d5bc-672d-456d-b6e1-859540485110" />

**Step 5:** Paste the Apps Script file contents into Code.gs. Make sure you have changed the email address.

<img width="1915" height="939" alt="image" src="https://github.com/user-attachments/assets/9749bea2-61df-4051-ac20-0fad9dc6aec4" />

**Step 6:** Deploy > New Deployment > Select Type: Web App > Execute As: Me > Who has access: Anyone > Deploy.

**Step 7:** Copy the generated link and paste it in script.js where it says "YOUR APPSCRIPT LINK".

## Usage

Add a unique topic to each page:

```html
<meta name="comment-topic" content="my-post-id">
```

The topic acts as the identifier for storing and loading comments for that specific page.

Example:

```html
<meta name="comment-topic" content="getting-started">
```

## Profanity Filter

The included filter helps keep discussions respectful by detecting and blocking abusive language.

Features:

- English slur detection
- Hindi slur detection
- Mixed-language detection
- Approximate matching
- Common obfuscation handling

This helps prevent users from bypassing moderation through intentional misspellings or character substitutions.

## Customization

Most styling can be modified through CSS variables:

```css
:root {
  --primary-color: #ff7340;
  --Mainbg: #ffffff;
  --color: #414141;
  --border-color: #cecece;
}
```

## Contributing

Contributions, bug reports, feature requests, and pull requests are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you find this project useful, consider giving it a star on GitHub.
```
