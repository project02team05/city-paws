async function editCommentHandler(event) {
  event.preventDefault();

  const btnID = event.target.getAttribute('data-id');
  const comment_content = document.querySelector('[data-id="' + btnID + '"]').value;

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(comment_content, btnID);

  const response = await fetch(`/api/comments/${btnID}`, {
      method: 'PUT',
      body: JSON.stringify({
        "comment_text": comment_content
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    }).catch((err) => {console.log(err)});
  
    
    if (response.ok) {
     document.location.replace(`/dashboard/edit/${post_id}`);
     console.log(response);
    } else {
      alert(response.statusText);
    }
}

const editCommentBtns = document.getElementsByClassName("edit-comment-btn");
    for (var i = 0; i < editCommentBtns.length; i++) {
      editCommentBtns[i].addEventListener("click", editCommentHandler) 
    };

