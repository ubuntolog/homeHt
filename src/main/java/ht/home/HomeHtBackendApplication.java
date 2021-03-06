package ht.home;

import ht.home.core.Database;
import ht.home.health.AppHealthCheck;
import ht.home.resources.MiscResource;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;

public class HomeHtBackendApplication extends Application<HomeHtBackendConfiguration> {
    private static final ch.qos.logback.classic.Logger LOGGER = (ch.qos.logback.classic.Logger) LoggerFactory.getLogger(MiscResource.class);

    public static void main(String[] args) throws Exception{
        new HomeHtBackendApplication().run(args);
    }

    @Override
    public void initialize(Bootstrap<HomeHtBackendConfiguration> bootstrap) {
        bootstrap.addBundle(new AssetsBundle("/frontend/webui/app/", "/", "index.html", "static"));
        bootstrap.setConfigurationSourceProvider(new SubstitutingSourceProvider(
            bootstrap.getConfigurationSourceProvider(), new EnvironmentVariableSubstitutor(false)));
    }

    @Override
    public void run(HomeHtBackendConfiguration configuration, Environment environment) {
        MiscResource miscResource = new MiscResource(configuration);

        environment.getApplicationContext().setErrorHandler(new HttpErrorHandler());
        environment.jersey().register(MultiPartFeature.class);
        environment.jersey().register(miscResource);
        environment.jersey().setUrlPattern("/api/*");
        environment.healthChecks().register("homeHt", new AppHealthCheck());

        Database db = new Database(configuration);
        if (!db.doesDBExist()) {
            LOGGER.warn("database does not exist");
            try {
                db.createBookingTable();
                LOGGER.info("created an empty table");
                LOGGER.info("adding fake records to the table");
                try {
                    db.populateBookingTable();
                } catch (SQLException e) {
                    LOGGER.error("failed to populate the table: " + e.getMessage());
                }
            } catch (SQLException e) {
                LOGGER.error("failed to create a table: " + e.getMessage());
            }


        }
    }
}
