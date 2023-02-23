package com.jarmison.varejo.online.api.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExceptionErrorMessage {
    String messageUser;
    String messageDev;
}
