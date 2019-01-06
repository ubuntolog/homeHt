package ht.home.resources;

import ht.home.HomeHtBackendConfiguration;
import ht.home.core.Database;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Path("")
public class MiscResource {
    private static final ch.qos.logback.classic.Logger LOGGER = (ch.qos.logback.classic.Logger) LoggerFactory.getLogger(MiscResource.class);

    private final HomeHtBackendConfiguration config;

    public MiscResource(HomeHtBackendConfiguration config) {
        this.config = config;
    }

    @GET
    @Path("/info")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response getApiInfo() {
        Map map = new HashMap<String, Object>() {{
            this.put("version", config.getVersion());
        }};
        LOGGER.info("API info was requested");
        return Response.ok(map).build();
    }

    @GET
    @Path("/booking/{id}")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response getBooking(@PathParam("id") String id) throws SQLException {

        Database db = new Database(config);
        db.Create();
        LOGGER.info("Booking was requested", id);
        return Response.ok().build();
    }

    @POST
    @Path("/booking")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response makeBooking(@FormDataParam("firstName") final String firstName,
                                   @FormDataParam("lastName") final String lastName,
                                   @FormDataParam("email") final String email,
                                   @FormDataParam("phone") final String phone,
                                   @FormDataParam("salary") final Integer salary,
                                   @Context HttpServletRequest request) {

        LOGGER.info("Trying to add a booking");
        return Response.ok().build();
    }
}
