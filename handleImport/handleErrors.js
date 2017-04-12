function handleErrors (missingColumns, criteriaFailures) {
  const errorMessages = [`Database insert aborted.`]
  if(missingColumns.length > 0) {
    errorMessages.push(
      `The following headers failed to match specified criteria:
        ${missingColumns.join(', ').replace('(,)$')}
      `
    )
  }
  if(criteriaFailures.length > 0) {
    errorMessages.push(
      `The following headers were expected but not found in the data file:
        ${criteriaFailures.join(', ').replace('(,)$')}
      `
    )
  }
  throw new Error(errorMessages.join('\n'))
}

module.exports = handleErrors
