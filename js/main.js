$(function() {
	var filename = "fix_me.html";

	function init() {
		tinyMCE.activeEditor.execCommand('mceFullScreen');
		var saved = localStorage.getItem("file_" + filename);
		if(saved !== null) {
			tinyMCE.activeEditor.setContent(saved);
		}
	}
	
	function save(editor) {
		if (Modernizr.localstorage) {
			localStorage.setItem("file_" + filename, editor.save());
		} else {
			alert("Local storage is required to save.");
		}
	}

	// tinyMCE configuration
	tinymce.init({
		selector: "textarea",
		plugins: [
			"advlist autolink lists link image charmap print preview anchor",
			"searchreplace visualblocks code fullscreen save",
			"insertdatetime media table contextmenu paste wordcount"
		],
		toolbar: "save | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
		setup: function(editor) {
			editor.on('init', function() {
				setTimeout(init, 0);
			});
		},
		save_enablewhendirty: true,
		save_onsavecallback: save
	});
});
