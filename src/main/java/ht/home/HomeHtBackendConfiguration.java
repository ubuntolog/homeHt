package ht.home;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.Configuration;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class HomeHtBackendConfiguration extends Configuration {
    @Valid
    @NotNull
    private String version;

    @JsonProperty("version")
    public String getVersion() {
        return version;
    }
}
