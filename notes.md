# HTML, CSS, and JavaScript Study Guide with Answers

## HTML

1. Q: What does the `link` element do?
   A: The `link` element is used to link external resources to an HTML document, most commonly CSS stylesheets.

2. Q: What does a `div` tag do?
   A: The `div` tag is a container that divides the HTML document into sections or groups content together.

3. Q: How would you display an image with a hyperlink in HTML?
   A: 
   ```html
   <a href="https://example.com">
     <img src="image.jpg" alt="Description of image">
   </a>
   ```

4. Q: What is the opening HTML tag for:
   - Paragraph: `<p>`
   - Ordered list: `<ol>`
   - Unordered list: `<ul>`
   - Second level heading: `<h2>`
   - First level heading: `<h1>`
   - Third level heading: `<h3>`

5. Q: How do you declare the document type to be HTML?
   A: `<!DOCTYPE html>`

## CSS

1. Q: What is the difference between the `#title` and `.grid` selector?
   A: `#title` selects an element with the ID "title", while `.grid` selects all elements with the class "grid".

2. Q: What is the difference between padding and margin?
   A: Padding is the space between an element's content and its border. Margin is the space outside an element's border.

3. Q: How will images be displayed using flex? (Given specific HTML and CSS)
   A: Flex allows for flexible alignment and distribution of space among items. The exact display depends on the specific flex properties used.

4. Q: What does the following padding CSS do? `padding: 10px 20px 15px 25px;`
   A: It sets padding to 10px (top), 20px (right), 15px (bottom), and 25px (left).

5. Q: By default, what is the CSS display property value of the HTML `span` element?
   A: The default display value for `span` is `inline`.

6. Q: How would you use CSS to change all the `div` elements to have a background color of red?
   A: `div { background-color: red; }`

7. Q: In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
   A: Content, Padding, Border, Margin

8. Q: Given the HTML `<p>double <span class="highlight">trouble</span></p>`, how would you use CSS to set the text "trouble" to green and leave the "double" text unaffected?
   A: `.highlight { color: green; }`

## JavaScript

1. Q: What does code using arrow syntax function declaration do? 
   A: Arrow functions provide a concise way to write function expressions. Example:
   ```javascript
   const add = (a, b) => a + b;
   ```

2. Q: What does code using `map` with an array output? 
   A: `map` creates a new array with the results of calling a provided function on every element in the array. Example:
   ```javascript
   const numbers = [1, 2, 3, 4];
   const doubled = numbers.map(num => num * 2);
   // doubled is now [2, 4, 6, 8]
   ```

3. Q: What does code output using `getElementById` and `addEventListener`? 
   A: It selects an element and attaches an event handler to it. Example:
   ```javascript
   document.getElementById('myButton').addEventListener('click', function() {
     console.log('Button clicked!');
   });
   ```

4. Q: What does a line of JavaScript do using a `#` selector?
   A: In modern JavaScript, `#` is used with `document.querySelector` to select an element by ID. Example:
   ```javascript
   const element = document.querySelector('#myId');
   ```

5. Q: What will code output when executed using a for loop and `console.log`? 
   A: It will print each iteration's value to the console. Example:
   ```javascript
   for (let i = 0; i < 5; i++) {
     console.log(i);
   }
   // Output: 0, 1, 2, 3, 4
   ```

6. Q: How would you use JavaScript to select an element with the id of "byu" and change the text color of that element to green?
   A: 
   ```javascript
   document.getElementById('byu').style.color = 'green';
   ```

7. Q: What is valid JavaScript syntax for:
   - if: `if (condition) { }`
   - else: `else { }`
   - for: `for (initialization; condition; increment) { }`
   - while: `while (condition) { }`
   - switch: `switch (expression) { case x: ... break; default: ... }`

8. Q: What is the correct syntax for creating a JavaScript object?
   A: 
   ```javascript
   const obj = {
     key1: value1,
     key2: value2
   };
   ```

9. Q: Is it possible to add new properties to JavaScript objects?
   A: Yes, you can add new properties to existing objects.

10. Q: If you want to include JavaScript on an HTML page, which tag do you use?
    A: The `<script>` tag. Example: `<script src="script.js"></script>` or `<script>/* JS code here */</script>`

11. Q: Given the HTML `<p>The <span id="animal">dog</span> chased the <span>fish</span></p>`, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
    A: `document.getElementById('animal').textContent = 'crow';`

12. Q: What will code using Promises output when executed? 
    A: Promises handle asynchronous operations. Example:
    ```javascript
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Done!"), 1000);
    });
    promise.then(result => console.log(result));
    // After 1 second, outputs: "Done!"
    ```

## DOM

Q: Which of the following are true about the DOM? (Mark all that apply)
A: 
- The DOM represents the document as a tree structure
- DOM methods allow programmatic access to the tree
- The DOM enables dynamic changes to the document's content, structure, and style

## JSON

Q: Which of the following correctly describes JSON?
A: JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write and easy for machines to parse and generate.

## Console Commands

Q: What do the following console commands do?
A:
- chmod: Change file permissions
- pwd: Print working directory
- cd: Change directory
- ls: List directory contents
- vim: Text editor
- nano: Text editor
- mkdir: Make directory
- mv: Move or rename files and directories
- rm: Remove files or directories
- man: Display manual pages for commands
- ssh: Secure shell for remote login
- ps: Report process status
- wget: Retrieve files using HTTP, HTTPS, or FTP
- sudo: Execute a command as another user, typically the superuser

Q: Which console command creates a remote shell session?
A: ssh

Q: What is true when the `-la` parameter is specified for the `ls` console command?
A: It shows a long listing format (`-l`) and includes hidden files (`-a`).

## Domain Names

Q: For the domain name `banana.fruit.bozo.click`:
A:
- Top-level domain: .click
- Subdomain: banana.fruit
- Root domain: bozo.click

## Web Security

1. Q: Is a web certificate necessary to use HTTPS?
   A: Yes, a valid SSL/TLS certificate is required to establish an HTTPS connection.

2. Q: Can a DNS A record point to an IP address or another A record?
   A: A DNS A record can only point to an IP address, not to another A record.

3. Q: Which protocols are associated with the following ports?
   A:
   - 443: HTTPS
   - 80: HTTP
   - 22: SSH
