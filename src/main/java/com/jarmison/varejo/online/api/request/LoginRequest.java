package com.jarmison.varejo.online.api.request;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    private String email;
    private String senha;
}
