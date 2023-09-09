$(document).ready(function () {
  $(".btn-close").on("click", function (e) {
    e.preventDefault();
    $target = $(e.target);
    const id = $target.attr("data-todoId");
    $.ajax({
      type: "DELETE",
      url: "/todo/" + id,
      success: function (response) {
        console.log(response);
        window.location.href = "/";
      },
      error: function (err) {
        console.error(err);
      },
    });
  });

  $("#todoForm").submit(function (e) {
    e.preventDefault();
    $form = $(this);
    if (!$form[0].checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      // https://stackoverflow.com/a/34402475
      $form[0].classList.add("was-validated");
    } else {
      $.ajax({
        type: "POST",
        url: "/todo",
        data: $form.serialize(),
        success: function (data) {
          console.log(data);
          window.location.href = "/";
        },
        error: function (err) {
          console.error(err);
        },
      });
    }
  });
});
