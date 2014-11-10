tinymce.init({
    selector: "textarea",
    plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    setup: function(editor) {
		editor.on('init', function() {
			setTimeout(function() {
				tinyMCE.editors[0].execCommand('mceFullScreen');
			},0);
		});
	},
});
