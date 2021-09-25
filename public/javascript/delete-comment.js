async function deleteCommentHandler(event) {
event.preventDefault();

  const deleteBtnID = event.target.getAttribute('data-id');
  const comment_content = document.querySelector('[data-id="' + deleteBtnID + '"]').value;

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(comment_content, deleteBtnID);

  const response = await fetch(`/api/comments/${deleteBtnID}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace(`/dashboard/edit/${post_id}`);
  } else {
    alert(response.statusText);
  }
}

const deleteBtn = document.getElementsByClassName("delete-comment-btn");
    for (var i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener("click", deleteCommentHandler) 
    };
  