tinymce.init({
    selector: "textarea",
    plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen save",
        "insertdatetime media table contextmenu paste"
    ],
    toolbar: "save | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    setup: function(editor) {
		editor.on('init', function() {
			setTimeout(function() {
				tinyMCE.editors[0].execCommand('mceFullScreen');
			},0);
		});
	},
	save_enablewhendirty: true,
    save_onsavecallback: function(editor) {
		console.log("Save");
		console.log(editor.save());
	}
});
