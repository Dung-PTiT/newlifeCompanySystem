package company.newlife.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "message")
public class MessageEntity {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "created_date", nullable = false)
    private String createdDate;

    @Column(name = "confirmed_date", nullable = false)
    private String confirmedDate;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "status", nullable = false)
    private Boolean status;
}
