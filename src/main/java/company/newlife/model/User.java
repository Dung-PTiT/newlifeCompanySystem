package company.newlife.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class User {
    private int id;
    private String username;
    private String password;
    private String name;
    private String phoneNumber;
    private String email;
    private String address;
    private String role;
    private Set<Post> posts;
}
