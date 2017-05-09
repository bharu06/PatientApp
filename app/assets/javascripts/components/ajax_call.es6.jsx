const ajaxCall = (settings, successFn, failureFn = null) => {
  return $.ajax(Object.assign({
    headers: {
      "X-CSRF-Token": $('meta[name="csrf-token"]').attr('content')
    },
    contentType: 'application/json',
    dataType: 'json',
  }, settings))
   .done((data) => {
     if (typeof data === 'undefined') {
       throw Errors.EmptyResponseError();
     }
     successFn(data);
   })
   .fail((xhr) => {
     let error = null;
     let message = null;
     let json = null;
     let code = null;
     if (xhr.status === 0) {
       error = Errors.NetworkError();
     } else if(xhr.status === 400) {
       if (xhr.responseJSON) {
         json = xhr.responseJSON;
         if (json.error) {
           message = json.error;
         }
         if (json.code) {
           code = json.code;
         }
       }
       if (code === 190) {
         window.location = "/account_links";
       }
       if (message) {

          //190 InvalidAccessTokenError
         error = Errors.BadRequestError(message, json);
       } else {
         error = Errors.BadRequestError(xhr.statusText, json);
       }
     } else if (xhr.status > 400) {
       error = Errors.GenericServerError(`HTTP Status ${xhr.status}: ${xhr.statusText}`);
     }

     if (failureFn) {
       failureFn(error, json);
     }
   });
};
