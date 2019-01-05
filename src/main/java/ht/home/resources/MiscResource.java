package ht.home.resources;

import ht.home.HomeHtBackendConfiguration;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("")
public class MiscResource {
    private static final ch.qos.logback.classic.Logger LOGGER = (ch.qos.logback.classic.Logger) LoggerFactory.getLogger(MiscResource.class);
    public static final String VERSION = "2.0.0";

    private final HomeHtBackendConfiguration config;

    public MiscResource(HomeHtBackendConfiguration config) {
        this.config = config;
    }

    @GET
    @Path("/info")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response getApiInfo() {
        Map map = new HashMap<String, Object>() {{
            this.put("version", VERSION);
        }};
        return Response.ok(map).build();
    }
}
