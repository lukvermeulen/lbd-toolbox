type RepresentationType = "brep" | "mesh" | "picture" | "plan" | "pointcloud";

export function generateAddRepresenation(
  type: RepresentationType,
  name: string,
  fileUrl: string,
  pictureUrl?: string
) {
  const query = `
        PREFIX : <http://example.org/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

        INSERT {
            # representation statement
            ?newRep a :representation .
        
            # meta information statement
            << ?newRep a :representation >>
                # type of representation
                :representationType :${type} ;

                # uploaded before
                :hasFileUrl "${fileUrl}"^^xsd:string ;

                # for thumbnail or picture representation
                ${
                  pictureUrl
                    ? `:hasPictureUrl "${pictureUrl}"^^xsd:string ;`
                    : ""
                }

                # provenance, date, author...
                :creationDate ?currentDate .
        }
        
        WHERE {
            BIND( :${name} AS ?newRep) .
            BIND( xsd:dateTime(NOW()) AS ?currentDate ) .
        }
    `;

  return query;
}

export function generateRemoveRepresentation(
  type: RepresentationType,
  representationName: string
) {
  const query = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>
            
        DELETE {
            <${representationName}> a :representation .

            << <${representationName}> a :representation >>
                :representationType :${type} ;
                :hasFileUrl ?fileUrl ;
                :creationDate ?creationDate .
        }
        WHERE {}
    `;

  return query;
}
