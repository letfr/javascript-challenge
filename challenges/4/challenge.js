/*
 * Normalização de estruturas
 */

/* ENUNCIADO
 *
 * Você deve escrever uma função que realize a
 * normalização da estrutura representada pela variável input de
 * forma que o retorno seja compatível com a variável output
 *
 */

/*
 * [INPUT] Object
 * {
 *   "id": "6197b77e-3942-11ea-a137-2e728ce88125",
 *   "user": {
 *     "id": "6197ba94",
 *     "name": "Laura"
 *   },
 *   "reports": [
 *     {
 *       "id": "51ddf1a9",
 *       "result": {
 *         "document": "356.4325-10",
 *         "status": "em análise",
 *       }
 *     }
 *   ]
 * }
 *
 * [OUTPUT] Object
 *  {
 *   "results": {
 *     "6197b77e-3942-11ea-a137-2e728ce88125": {
 *       id: "6197b77e-3942-11ea-a137-2e728ce88125",
 *       user: "6197ba94",
 *       reports: ["51ddf1a9"]
 *     }
 *   },
 *   "users": {
 *     "6197ba94": { "id": "6197ba94", "name": "Laura" }
 *   },
 *   "reports": {
 *     "51ddf1a9": {
 *        "id": "51ddf1a9",
 *        "user": "6197ba94",
 *        "document": "356.4325-10",
 *        "status": "em análise",
 *      }
 *    }
 *  }
 */

const normalizeData = unormalized => {
  let reports = []
  let reportsId = []

  for (let i in unormalized.reports) {
    reportsId.push(unormalized.reports[i].id)
    reports.push(unormalized.reports[i])
  }

  let mapReports = Object.keys(reports)
    .map(i => {
      return `"${reports[i].id}": {
      "id": "${reports[i].id}",
      "user": "${unormalized.user.id}",
      "document": "${reports[i].result.document}",
      "status": "${reports[i].result.status}"
      }`
    })
    .join(',')

  let normalized = `{
    "results": {
      "${unormalized.id}": {
        "id": "${unormalized.id}",
        "user": "${unormalized.user.id}",
        "reports": ${JSON.stringify(reportsId)}
      }
    },
    "users": {
      "${unormalized.user.id}": { 
        "id": "${unormalized.user.id}", 
        "name": "${unormalized.user.name}" 
      }
    },
    "reports": { ${mapReports} }
  }`
  return JSON.parse(normalized)
}

module.exports = normalizeData
