/**
 * Convert a `File` object returned by the upload input into
 * a base 64 string. That's easier to use on FakeRest, used on
 * the ng-admin example. But that's probably not the most optimized
 * way to do in a production database.
 */
const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () =>
      resolve({ name: file.rawFile.name, picture64: reader.result });
    reader.onerror = reject;
  });

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const fileUpload = requestHandler => (type, resource, params) => {
  if ((type === 'CREATE' || type === 'UPDATE') && resource === '_groups') {
    if (params.data.pictures && params.data.pictures.length) {
      const formerPictures = params.data.pictures.filter(
        p => !(p.rawFile instanceof File)
      );
      const newPictures = params.data.pictures.filter(
        p => p.rawFile instanceof File
      );

      return Promise.all(newPictures.map(convertFileToBase64))
        .then(base64Pictures =>
          base64Pictures.map(p => ({
            src: p.picture64,
            name: p.name
          }))
        )
        .then(transformedNewPictures =>
          requestHandler(type, resource, {
            ...params,
            data: {
              ...params.data,
              pictures: [...transformedNewPictures, ...formerPictures]
            }
          })
        );
    }
  }

  return requestHandler(type, resource, params);
};

export default fileUpload;
