document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message');
    let activeCommentSection = null;

    sendBtn.addEventListener('click', function () {
        const message = messageInput.value.trim();
        if (message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.textContent = message;
            messageDiv.addEventListener('click', function () {
                toggleCommentSection(messageDiv);
            });
            chatBox.appendChild(messageDiv);
            messageInput.value = '';
        }
    });

    function toggleCommentSection(messageDiv) {
        // Cerrar la sección de comentarios activa si hay una abierta
        if (activeCommentSection && activeCommentSection !== messageDiv.nextElementSibling) {
            activeCommentSection.classList.add('hidden');
        }

        // Verificar si la sección de comentarios ya existe
        let commentSection = messageDiv.nextElementSibling;
        if (commentSection && commentSection.classList.contains('comment-section')) {
            commentSection.classList.toggle('hidden');
            activeCommentSection = commentSection.classList.contains('hidden') ? null : commentSection;
        } else {
            // Crear una nueva sección de comentarios si no existe
            commentSection = document.createElement('div');
            commentSection.className = 'comment-section';
            
            const commentInput = document.createElement('input');
            commentInput.type = 'text';
            commentInput.className = 'comment';
            commentInput.placeholder = 'Comenta algo...';

            const commentBtn = document.createElement('button');
            commentBtn.textContent = 'Comentar';
            commentBtn.className = 'comment-btn';

            const commentsList = document.createElement('div');
            commentsList.className = 'comments-list';

            commentBtn.addEventListener('click', function () {
                const comment = commentInput.value.trim();
                if (comment) {
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment-item';
                    commentDiv.textContent = comment;
                    commentsList.appendChild(commentDiv);

                    // Almacenar comentarios en el objeto DOM del mensaje
                    if (!messageDiv.comments) {
                        messageDiv.comments = [];
                    }
                    messageDiv.comments.push(comment);

                    commentInput.value = '';
                }
            });

            commentSection.appendChild(commentsList);
            commentSection.appendChild(commentInput);
            commentSection.appendChild(commentBtn);

            // Insertar la sección de comentarios justo debajo del mensaje
            messageDiv.insertAdjacentElement('afterend', commentSection);

            // Si hay comentarios previos, mostrarlos
            if (messageDiv.comments) {
                messageDiv.comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment-item';
                    commentDiv.textContent = comment;
                    commentsList.appendChild(commentDiv);
                });
            }

            activeCommentSection = commentSection;
        }
    }
});
document.getElementById('postTweetButton').addEventListener('click', function() {
    const tweetText = document.getElementById('tweetInput').value.trim();
    
    if (tweetText !== "") {
        // Crear un nuevo div para el tweet
        const tweetDiv = document.createElement('div');
        tweetDiv.className = 'tweet';
        tweetDiv.innerHTML = `
            <p>${tweetText}</p>
            <div class="comment-section hidden">
                <input type="text" placeholder="Add a comment">
            </div>
        `;

        // Agregar el tweet al contenedor de tweets
        const tweetsContainer = document.getElementById('tweetsContainer');
        tweetsContainer.prepend(tweetDiv);

        // Limpiar el input
        document.getElementById('tweetInput').value = "";

        // Añadir evento para abrir y cerrar comentarios
        tweetDiv.addEventListener('click', function() {
            const openTweet = document.querySelector('.tweet.open');
            
            if (openTweet && openTweet !== tweetDiv) {
                openTweet.classList.remove('open');
                openTweet.querySelector('.comment-section').classList.add('hidden');
            }
            
            tweetDiv.classList.toggle('open');
            tweetDiv.querySelector('.comment-section').classList.toggle('hidden');
        });
    }
});

