/**
 * Merge the contents of two or more objects together into the first object.
 * @param deep If true, the merge becomes recursive (aka. deep copy).
 * @param target An object that will receive the new properties
 * @param objects The objects containing additional properties to merge in.
 * @see http://www.damirscorner.com/blog/posts/20180216-VariableNumberOfArgumentsInTypescript.html
 * @see https://gomakethings.com/merging-objects-with-vanilla-javascript/
 */
export const extend = (
  options: {
    /** Deep merge, if true compares also nested objects */
    deep?: boolean;
    /** Keep existing values, if true only undefined target values will be overwritten with the source value */
    keepValues?: boolean;
    /** If true only overwrite target values if the source value is defined / not undefined */
    onlyDefined?: boolean;
    /** merge arrays, if true, two arrays will be merged into one */
    mergeArrays?: boolean;
  } = {},
  extended: any = {},
  ...objects: any[]
) => {
  // Merge the object into the extended object
  const merge = (obj: any) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (
          options.deep &&
          Object.prototype.toString.call(obj[prop]) === "[object Object]"
        ) {
          // If we're doing a deep merge and the property is an object
          extended[prop] = extend(options, extended[prop], obj[prop]);
        } else {
          // Otherwise, do a regular merge
          if (options.keepValues) {
            // Only overwrite target value if the target value is undefined
            if (typeof extended[prop] === "undefined") {
              extended[prop] = obj[prop];
            }
          } else if (options.onlyDefined) {
            // Only overwrite target value if the source value is defined / not undefined
            if (typeof obj[prop] !== "undefined") {
              extended[prop] = obj[prop];
            }
          } else if (options.mergeArrays) {
            // Merge array if both values are array's
            if (Array.isArray(extended[prop]) && Array.isArray(obj[prop])) {
              extended[prop] = [...extended[prop], ...obj[prop]];
            } else {
              extended[prop] = obj[prop];
            }
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for (let i = 0; i < objects.length; i++) {
    merge(objects[i]);
  }

  return extended;
};
