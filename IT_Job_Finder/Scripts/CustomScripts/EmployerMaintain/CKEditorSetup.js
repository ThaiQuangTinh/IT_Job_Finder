let myCKEditor;

ClassicEditor
    .create(document.querySelector('#editor'), {
        placeholder: 'Nhập mô tả công việc'
    })
    .then(editor => {
        myCKEditor = editor;
        console.log(editor);
    })
    .catch(error => {
        console.error(error);
    });

