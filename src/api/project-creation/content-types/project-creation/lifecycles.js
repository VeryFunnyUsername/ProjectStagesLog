module.exports = {
  
  //Creating  new entry in ProjectReport collection
  async afterCreate(event) {
    const { result } = event;
    console.log("\n-------------\nCreating ProjectReport", result.ProjectName, '\n-------------\n');
    try{
      await strapi.query('api::project-report.project-report').create({data: {
      ProjectName: result.ProjectName,
      ProjectNumber: result.ProjectNumber
      }});
      console.log("\n-------------\nProjectReport created\n-------------\n")
    }
    catch (err) {
    strapi.log.debug("\n-------------\nError: ProjectReport not created\n-------------\n", err);    
    }
  },

  //Deleting entries of same ProjectName in ProjectReport and TestReport
  async beforeDelete(event){
  // const { result } = event;

    //Getting ID of current entry
    const { data, where, select, populate } = event.params;
    const id = where.id;
    console.log("\n-------------\nID: ", id, "\n-------------\n")

    //Getting name of current entry
    const currentEntryName = await strapi.entityService.findOne("api::project-creation.project-creation", id, {fields:['ProjectName']})
    console.log("\n-------------\nexistingData: ", currentEntryName.ProjectName,  "\n-------------\n")

    try {

      //Finding all existing entries "ProjectName" an id in ProjectReport
      const entriesPrRep = await strapi.query('api::project-report.project-report').findMany();
      let listProjectData = entriesPrRep.map(entry => ({
        projectName: entry.ProjectName,
        id: entry.id
      }));
      console.log("\n-------------\nList: listProjectData ", listProjectData, "\n-------------\n")
    
      //Getting id of ProjectReport.ProjectName that matches ProjectCreation.ProjectName
      let correspondingIdPrRep;
      let ok;
      listProjectData.forEach(item => {
        if (item.projectName === currentEntryName.ProjectName) {
          correspondingIdPrRep = item.id;
          ok = 1;
        }
        else(
          ok = 0
        )
      })
      console.log("\n-------------\nList: correspondingIdPrRep ", correspondingIdPrRep, "\n-------------\n")
    
      //Deleting entry in ProjectReport if exists
      if(ok===1){
        await strapi.entityService.delete('api::project-report.project-report', correspondingIdPrRep)
        console.log("\n-------------\nReferenced data in ProjectReport deleted\n-------------\n")
      }
          
      //Finding all existing entries "ProjectName" an id in TestReport
      const entriesTeRep = await strapi.query('api::test-report.test-report').findMany();
      let listPrDaTestRep = entriesTeRep.map(entry => ({
        projectName: entry.ProjectName,
        id: entry.id
      }));
      console.log("\n-------------\nList: listPrDaTestRep ", listPrDaTestRep, "\n-------------\n")
    
      //Getting id of TestReport.ProjectName that matches ProjectCreation.ProjectName
      let correspondingIdTeRep;
      let ok1;
      listPrDaTestRep.forEach(item => {
        if (item.projectName === currentEntryName.ProjectName) {
          correspondingIdTeRep = item.id;
          ok1 = 1;
        }
        else(
          ok1 = 0
        )
      })
      console.log("\n-------------\nList: correspondingId ", correspondingIdTeRep, "\n-------------\n")
      
      //Deleting entry in TestReport if exists
      if(ok1===1){
        await strapi.entityService.delete('api::test-report.test-report', correspondingIdTeRep)
        console.log("\n-------------\nReferenced data in TestReport deleted\n-------------\n")
      }
      return;
    }
    catch (err) {
      strapi.log.debug("\n-------------\nError: Referenced data not deleted\n-------------\n", err);
      throw err;  
    }
  }
};
