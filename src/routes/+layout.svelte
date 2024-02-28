<nav>
    <new-rating-button>
        New Rating
    </new-rating-button>
    <test-block>
        test
    </test-block>
</nav>

<slot/>

<style>
    /* Default css behavior */

    :global(body, html) {
        height: 100%;
        padding: 0;
        margin: 0;
    }


    nav {
        background-color: #1976d2; /* Material UI primary color */
        color: white;
        display: flex;
        align-items: center;
        padding: 10px 20px;
    }

    nav > * {
        margin-left: 10px; /* Move buttons to the left */
    }

    nav > *:first-child {
        margin-left: 0; /* No margin for the first button */
    }

    nav > *:hover {
        cursor: pointer;
    }

    /* Custom element styles */
    new-rating-button,
    test-block {
        display: flex;
        border: none;
        background-color: transparent;
        color: white;
        font-size: 14px;
        text-transform: uppercase;
        cursor: pointer;
    }

    new-rating-button:hover,
    test-block:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

</style>

