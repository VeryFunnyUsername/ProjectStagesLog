module.exports = {
  async afterUpdate(event) {
    console.log('\n-------------\nCreating "ProjectTest"\n-------------\n')
    const { result } = event;
    if (result.ForQualityCheck === true) {
      console.log('\n-------------\nCommand "IF" launched correctly... checking bool status:', result.ForQualityCheck, '\n-------------\n');
      try{
        await strapi.query('api::test-report.test-report').create({data: {
          ProjectName: result.ProjectName,
          ProjectNumber: result.ProjectNumber,
        }});
        console.log("\n-------------\nTestProject created\n-------------\n")
      }
      catch (err) {
      strapi.log.debug("\n-------------\nError: TestProject not created\n-------------\n", err);    
      }
    }
  }
};