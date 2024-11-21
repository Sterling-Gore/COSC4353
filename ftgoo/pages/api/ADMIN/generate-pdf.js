import PDFDocument from 'pdfkit';
import { supabase } from '../../../supabaseClient';

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

            try {
                const doc = new PDFDocument();
            
                // Correctly set headers for PDF response
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
            
                // Pipe the document to the response
                doc.pipe(res);
            
                // Add some PDF content
                doc.fontSize(25).text('Volunteer History', { align: 'center' });
                for (const volunteer of volunteers)
                {
                    doc.fontSize(20).text(volunteer.firstname + " " + volunteer.lastname + "  [ user ID: " + volunteer.userid + " ] " )
                    if (volunteer.oldevents.length == 0)
                    {
                        doc.fontSize(16).text("No events previously attended");
                    }
                    else
                    {
                        for (const event of events)
                        {
                            if (volunteer.oldevents.includes(Number(event.eventid)))
                            {
                                doc.fontSize(16).text("  - " + event.eventname);
                            }
                        }
                    }
                    doc.moveDown();
                }
                doc.moveDown();
                doc.moveDown();

                doc.fontSize(25).text('Events', { align: 'center' });
                for (const event of events)
                {
                    doc.fontSize(20).text("Event Name:" + event.eventname + "  [ event ID: " + event.eventid + " ]" );
                    doc.fontSize(18).text(" Description:");
                    doc.fontSize(16).text("   - " + event.description);

                    doc.fontSize(18).text(" Address:");
                    doc.fontSize(16).text("   - " + event.address + ", " + event.city + ", " + event.state + ", " + event.zipcode);

                    doc.fontSize(18).text(" Event Date:");
                    doc.fontSize(16).text("   - " + event.day + ", " + event.eventdate);

                    doc.fontSize(18).text(" Required Skills:");
                    doc.fontSize(16).text("   - " + event.skills);

                    doc.fontSize(18).text(" RSVP'd Volunteers:");
                    for(const volunteer of volunteers)
                    {
                        if(volunteer.rsvpevents.includes(event.eventid))
                        {
                            doc.fontSize(16).text("   - " + volunteer.firstname + " " + volunteer.lastname + "  [ user ID: " + volunteer.userid + " ] " );
                        }
                        
                    }
                    
                    
                    doc.moveDown();
                }

                //doc.fontSize(16).text('This is a dynamically generated PDF.');
                //doc.fontSize(16).text(JSON.stringify(events));
            
                // Finalize the document
                console.log('Finalizing PDF...');
                doc.end();
                console.log('PDF generation completed.');
              } catch (error) {
                console.error('Error generating PDF:', error);
                res.status(500).send('Error generating PDF');
              }
          
        } else{
          return res.status(401).json({ error: "volunteers do not exist" });
        }
      }catch(err){
        console.log(err)
        return res.status(500).json({ error: "Cant get data"})
      }
    
}