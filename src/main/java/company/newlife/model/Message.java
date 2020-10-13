package company.newlife.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class Message {
    private Integer id;
    private String name;
    private String email;
    private String phoneNumber;
    private String createdDate;
    private String confirmedDate;
    private String content;
    private Boolean status;
}
