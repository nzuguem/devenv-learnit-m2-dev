package me.nzuguem;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/calculator")
public class CaculatorResource {

    @POST
    @Path("add")
    @Produces(MediaType.APPLICATION_JSON)
    public Response add(Operande operande) {
        return Response.ok(Map.of("result", operande.add()))
                .build();
    }

    @POST
    @Path("multiply")
    @Produces(MediaType.APPLICATION_JSON)
    public Response multiply(Operande operande) {
        return Response.ok(Map.of("result", operande.multiply()))
                .build();
    }
}
