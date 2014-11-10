$(function() {
	var filename = "fix_me.html";

	var achievements = {
		3 : {text:'You wrote something!'},
		100 : {text:'Flash Fiction'},
		1000 : {text:'Short Story'},
		7500 : {text:'Novelette'},
		20000 : {text:'Novella'},
		50000 : {text:'Novel'},
		110000 : {text:'Epic'}
	};

	function achieve(threshold) {
		var achievement = achievements[threshold];
		toastr.success("Achievement: " + achievement.text);
		achievement.got = true;
	}

	function hasAchievement(threshold) { return achievements[threshold].got; }

	var wordCount = 2;

	function localWarn() {
		toastr.error("Local storage is required to save.");
	}

	function init() {
		tinyMCE.activeEditor.execCommand('mceFullScreen');
		if (Modernizr.localstorage) {
			var saved = localStorage.getItem("file_" + filename);
			if(saved !== null) {
				tinyMCE.activeEditor.setContent(saved);
			}
		} else {
			localWarn();
		}
	}

	function keyup() {
		var before = wordCount;
		wordCount = tinyMCE.activeEditor.plugins.wordcount.getCount();
		Object.keys(achievements).forEach(function(threshold) {
			if(wordCount >= threshold &&
			   before < threshold &&
			   !hasAchievement(threshold)) {
				achieve(threshold);
			}
		});
	}

	function save(editor) {
		if (Modernizr.localstorage) {
			localStorage.setItem("file_" + filename, editor.save());
		} else {
			localWarn();
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
			editor.on('keyup', keyup);
		},
		save_enablewhendirty: true,
		save_onsavecallback: save
	});
});
