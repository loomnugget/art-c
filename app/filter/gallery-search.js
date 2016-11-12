'use strict';

module.exports = function(){
  return function(galleries, searchTermName, searchTermDesc){

    let fuzzyRegexName = generateFuzzyRegex(searchTermName);
    let fuzzyRegexDesc = generateFuzzyRegex(searchTermDesc);

    let filteredArray = galleries.filter(gallery => {
      return fuzzyRegexName.test(gallery.name.toUpperCase());
    });

    filteredArray =filteredArray.filter(gallery => {
      return fuzzyRegexDesc.test(gallery.desc.toUpperCase());
    });

    return filteredArray;
  };
};

function generateFuzzyRegex(input){
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
