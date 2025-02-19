function viewProfile(idEnc) {
	history.pushState(null, null, '/profile/view/' + idEnc);
	let url = '/profile/view/modal/' + idEnc;
	$("#user-profile-container").load(url, function() {
		setTimeout(function() { openModal("user-profile-modal") }, 1);
	});
}

function likeUser(idEnc) {
	$.ajax({
		type : "POST",
		url : "/user/like/" + idEnc,
		success : function() {
			location.reload(true);
		},
		error : function(e) {
			console.log(e);
			alert(getGenericErrorText());
		}
	});

}

function hideUser(idEnc) {
	$.ajax({
		type : "POST",
		url : "/user/hide/" + idEnc,
		success : function() {
			location.reload(true);
		},
		error : function(e) {
			console.log(e);
			alert(getGenericErrorText());
		}
	});
}

function blockUser(idEnc) {

	var r = confirm(getText("userprofile.js.block-user"));
	if (r == true) {

		$.ajax({
			type: "POST",
			url: "/user/block/" + idEnc,
			success: function() {
				alert(getText("success.generic"));
			},
			error: function(e) {
				console.log(e);
				alert(getGenericErrorText());
			}
		});
	}
}

function unblockUser(idEnc) {

	var r = confirm(getText("userprofile.js.unblock-user"));
	if (r == true) {
		$.ajax({
			type: "POST",
			url: "/user/unblock/" + idEnc,
			success: function() {
				//location.reload(true);
				alert(getText("success.generic"));
			},
			error: function(e) {
				console.log(e);
				alert(getGenericErrorText());
			}
		});
	}
}

function reportUser() {
	var element = document.getElementById("report-user-div");
	element.classList.toggle("display-none");
	//window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
	element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
}

function reportUserSubmit(idEncoded) {
	$.ajax({
		type: "POST",
		url: "/user/report/" + idEncoded,
		contentType: "text/plain",
		data: $("#report-comment").val(),
		success: function() {
			alert(getText("userprofile.js.success.report-user"));
			//location.reload(true);
		},
		error: function(e) {
			refreshCaptcha();
			alert(getGenericErrorText());
		}
	});
}

$(window).on("popstate", function(e) {
	closeModal();
});