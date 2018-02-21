function totalAmountContributed(project){
  return project.contributedMoneys
        .reduce((sum,contributer) =>{
         return sum + contributer.amount;
          },0)
}

function totalbackers(project){
  const backers = new Set();
  project.contributedMoneys
  .forEach(contribution =>backers.add(contribution.userId))
  return backers.size;
}

module.exports = {
  totalAmountContributed,
  totalbackers
}
