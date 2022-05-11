let studentList = [];

$(function () {
  //lấy giá trị nhập vào của học sinh
  $("#input").click(function () {
    getInfo();
  });
  //hàm tính điểm trung bình
  $("#getAverage").click(function () {
    average();
  });
  //hàm kiêm tra học sinh giỏi
  $("#checkRank").click(function () {
    isGoodStudent();
  });
  //hàm xóa dòng thông tin học sinh
  $("#myTable").on("click", ".ondelete", function () {
    $(this).parents("tr").remove();
  });
});

function getInfo(e) {
  //lấy giá trị nhập vào
  let name = $("#name").val();
  let maths = $("#maths").val().trim();
  let physics = $("#physics").val().trim();
  let chemistry = $("#chemistry").val().trim();

  //kiểm tra form nhập vào không bị bỏ trống, ký tự nhập vào đúng với yêu cầu
  if (name === "") {
    showError("Vui lòng nhập tên");
    e.preventDefault();
  } else if (!isNaN(name)) {
    showError("Vui lòng nhập tên không chứa ký tự số");
    e.preventDefault();
  } else if (maths === "" || physics === "" || chemistry === "") {
    showError("Vui lòng nhập điểm");
    e.preventDefault();
  } else if (isNaN(maths) || isNaN(physics) || isNaN(chemistry)) {
    showError("Vui lòng nhập điểm bằng ký tự số");
    e.preventDefault();
  } else if (
    maths > 10 ||
    maths < 0 ||
    physics > 10 ||
    physics < 0 ||
    chemistry > 10 ||
    chemistry < 0
  ) {
    showError("Vui lòng nhập điểm từ 0 - 10");
    e.preventDefault();
  }

  //tạo object của 1 học sinh
  let testScore = {
    name: name,
    maths: maths,
    physics: physics,
    chemistry: chemistry,
  };
  //đẩy object học sinh vào danh sách
  studentList.push(testScore);

  // xóa form sau khi nhập
  $("input").val("");
  //gọi hàm rendẻr thông tin học sinh ra bảng
  studentInfo();
}

// hàm hiện lỗi khi valid cho form
function showError(message) {
  $(".error").html(message);
  $(".error").show();
}
// hàm render thông tin học sinh ra bảng
function studentInfo() {
  // xóa dòng thông tin lặp lại
  $("#myTable tr").each(function () {
    $(this).remove();
  });

  var tbd = "";

  tbd =
    "<tbody>" +
    "<tr>" +
    "<th  scope='col'>STT</th>" +
    "<th  scope='col'>Họ tên</th>" +
    "<th  scope='col'>Toán</th>" +
    "<th  scope='col'>Lý</th>" +
    "<th  scope='col'>Hóa</th>" +
    "<th  scope='col'>Trung bình</th>" +
    "<th  scope='col'>Hành động</th>";
  ("</tr>");

  for (let i = 0; i < studentList.length; i++) {
    var student = studentList[i];
    tbd +=
      "<tr><td>" +
      (i + 1) +
      "</td><td>" +
      student.name +
      "</td><td class='mark'>" +
      student.maths +
      "</td><td class='mark'>" +
      student.physics +
      "</td><td class='mark'>" +
      student.chemistry +
      "</td><td id='average'>?</td><td><a href='#' class='ondelete btn btn-success'>Xóa</a></td></tr>";
  }

  tbd += "</tbody>";
  $("#myTable").append(tbd);
}

//hàm tính điểm trung bình
function average() {
  //lấy thông tin dòng và lặp qua dòng cần lấy
  $("#myTable tbody tr").each(function () {
    //tạo bién tìm ô điểm trung bình
    let td = $(this).find("td:eq(5)");
    //sử dụng điều kiện để kiêrm tra
    if (td.text() == "?") {
      //tạo biến để lấy thông tin từ các ô chứa điểm của học sinh
      let maths = $(this).find("td:eq(2)").text();
      let physics = $(this).find("td:eq(3)").text();
      let chemistry = $(this).find("td:eq(4)").text();
      //tạo biến average để tính điểm trung bình kết hợp hơp với method parseFloat để lấy số thực
      let average =
        (parseFloat(maths) + parseFloat(physics) + parseFloat(chemistry)) / 3;
      // giá trị điểm trung bình có độ chính xác đến 1 số sau dấu chấm
      average = average.toFixed(1);
      //gán giá trị đã tính từ hàm trung bình về côt td để render về phía client
      td.text(average);
    }
  });
}

//hàm kiểm tra học sinh gioi
function isGoodStudent() {
  //dùng vòng lặp qua từng dòng
  $("#myTable tbody tr").each(function () {
    let td = $(this).find("td:eq(5)").text();
    //sử dụng điều kiện check ô điêmr trung bình có >= 8.0
    //nếu kết quả là true thì bôi màu nền đỏ cho học sinh đó
    if (td >= 8.0) {
      $(this).css("background-color", "red");
    }
  });
}
