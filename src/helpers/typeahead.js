// typeahead implementation


const usersAll = [
  "ESL_SC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "OgamingSC2",
  "RobotCaleb",
  "noobs2ninjas",
  "Orange_HS",
  "Rainbow6",
  "Ninja",
  "MOONMOON_OW"
];

const typeahead = () => {
    let substringMatcher = function(strs) {
        return function findMatches(q, cb) {

            let matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substringRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            strs.forEach((i, str) => {
                if (substringRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    $('#searchForm .typeahead').typeahead({
        hint: false,
        highlight: false,
        minLength: 1,
        cache: false
    }, {
        name: 'users',
        source: substringMatcher(usersAll)
    });

};
 export default { typeahead }