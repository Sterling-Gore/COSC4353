import { supabase } from '../../../supabaseClient';
import { createObjectCsvStringifier } from "csv-writer";


export default async function handler(req, res)
{
    try {
        const {data: volunteers, UsersError} = await supabase
        .from('users')
        .select()
        .eq('role', 'user')

        if (UsersError) throw UsersError;

        const {data: events, EventsError} = await supabase
        .from('events')
        .select()

        if (EventsError) throw EventsError;

        if (volunteers && events) {


            try
            {
                var data = [];
                for (const event of events)
                {
                    var eventvolunteers = [];
                    for (const volunteer of volunteers)
                    {
                        if(volunteer.rsvpevents.includes(event.eventid))
                            {
                                //doc.fontSize(16).text("   - " + volunteer.firstname + " " + volunteer.lastname + "  [ user ID: " + volunteer.userid + " ] " );
                                eventvolunteers.push(`${volunteer.firstname} ${volunteer.lastname}`)
                            }
                    }
                    data.push( {eventname: event.eventname, eventID: event.eventid, description: event.description, address: `${event.address} ${event.city} ${event.state} ${event.zipcode}`, eventdate: `${event.day} ${event.eventdate}`, requiredskills: event.skills, rsvpvolunteers: eventvolunteers});
                    
                }
                //{ name: `${volunteers[0].firstname} ${volunteers[0].lastname}`, userID: volunteers[0].userid, volunteerhistory: volunteers[0].oldevents },
                //{ name: "Bob", age: 30, profession: "Designer" },
                //{ name: "Charlie", age: 35, profession: "Teacher" },
                  
                
                  // Create CSV stringifier
                  const csvStringifier = createObjectCsvStringifier({
                    header: [
                      { id: "eventname", title: "Event Name" },
                      { id: "eventID", title: "eventID" },
                      { id: "description", title: "Description" },
                      { id: "address", title: "Address"},
                      { id: "eventdate", title: "Event Date"},
                      { id: "requiredskills", title: "Required Skills"},
                      { id: "rsvpvolunteers", title: "RSVP'd Volunteers"},
                    ],
                  });
                
                  // Generate CSV content
                  const csvContent = [
                    csvStringifier.getHeaderString(), // Add headers
                    csvStringifier.stringifyRecords(data), // Add rows
                  ].join("");
                
                  // Set headers to prompt file download
                  res.setHeader("Content-Type", "text/csv");
                  res.setHeader("Content-Disposition", "attachment; filename=data.csv");
                
                  // Send the CSV content as the response
                  res.status(200).send(csvContent);

            } 
            catch (error)
            {
                console.error('Error generating CSV', error);
                return res.status(500).json({error: "Error generating CSV"});
            }
        
        }
        else{
            return res.status(401).json({ error: "volunteers do not exist" });
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: "Cant get data"})
    }
}