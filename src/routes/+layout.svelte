<nav>
    <ul>
        <li>
            <a href="/new-rating">New Rating</a>
        </li>
        <li>
            <a href="/test">Test</a>
        </li>
    </ul>
</nav>

<slot/>

<style>

:global(body, html) {
        height: 100%;
        padding: 0;
        margin: 0;
        background-color: #f0f0f0; /* Light gray background */
        font-family: 'Roboto', sans-serif; /* Material UI default font */
    }

    nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        background-color: #1976d2; 
        height: 3rem;
    }

    li {
        height: 100%;
    }

    nav ul li a {
        text-decoration: none;
        color: white;
        display: block;
        transition: background-color 0.3s ease;
        height: 100%;
        padding: 0 1rem;
    }

    nav ul li a:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }




</style>

