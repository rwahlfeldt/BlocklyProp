/**
 * This class is generated by jOOQ
 */
package eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records;


import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.Project;

import java.util.GregorianCalendar;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record10;
import org.jooq.Row;
import org.jooq.Row10;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@Generated(
	value = {
		"http://www.jooq.org",
		"jOOQ version:3.6.1"
	},
	comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class ProjectRecord extends UpdatableRecordImpl<ProjectRecord> implements Record10<Long, Integer, String, String, String, Integer, Boolean, Boolean, GregorianCalendar, GregorianCalendar> {

	private static final long serialVersionUID = -1891195974;

	/**
	 * Setter for <code>blocklyprop.project.id</code>.
	 */
	public void setId(Long value) {
		setValue(0, value);
	}

	/**
	 * Getter for <code>blocklyprop.project.id</code>.
	 */
	public Long getId() {
		return (Long) getValue(0);
	}

	/**
	 * Setter for <code>blocklyprop.project.id_user</code>.
	 */
	public void setIdUser(Integer value) {
		setValue(1, value);
	}

	/**
	 * Getter for <code>blocklyprop.project.id_user</code>.
	 */
	public Integer getIdUser() {
		return (Integer) getValue(1);
	}

	/**
	 * Setter for <code>blocklyprop.project.name</code>.
	 */
	public void setName(String value) {
		setValue(2, value);
	}

	/**
	 * Getter for <code>blocklyprop.project.name</code>.
	 */
	public String getName() {
		return (String) getValue(2);
	}

	/**
	 * Setter for <code>blocklyprop.project.description</code>.
	 */
	public void setDescription(String value) {
		setValue(3, value);
	}

	/**
	 * Getter for <code>blocklyprop.project.description</code>.
	 */
	public String getDescription() {
		return (String) getValue(3);
	}

	/**
	 * Setter for <code>blocklyprop.project.code</code>.
	 */
	public void setCode(String value) {
		setValue(4, value);
	}

	/**
	 * Getter for <code>blocklyprop.project.code</code>.
	 */
	public String getCode() {
		return (String) getValue(4);
	}

	/**
	 * Setter for <code>blocklyprop.project.type</code>.
	 */
	public void setType(Integer value) {
		setValue(5, value);
	}

	/**
	 * Getter for <code>blocklyprop.project.type</code>.
	 */
	public Integer getType() {
		return (Integer) getValue(5);
	}

	/**
	 * Setter for <code>blocklyprop.project.private</code>.
	 */
	public void setPrivate(Boolean value) {
		setValue(6, value);
	}

	/**
	 * Getter for <code>blocklyprop.project.private</code>.
	 */
	public Boolean getPrivate() {
		return (Boolean) getValue(6);
	}

	/**
	 * Setter for <code>blocklyprop.project.shared</code>.
	 */
	public void setShared(Boolean value) {
		setValue(7, value);
	}

	/**
	 * Getter for <code>blocklyprop.project.shared</code>.
	 */
	public Boolean getShared() {
		return (Boolean) getValue(7);
	}

	/**
	 * Setter for <code>blocklyprop.project.created</code>.
	 */
	public void setCreated(GregorianCalendar value) {
		setValue(8, value);
	}

	/**
	 * Getter for <code>blocklyprop.project.created</code>.
	 */
	public GregorianCalendar getCreated() {
		return (GregorianCalendar) getValue(8);
	}

	/**
	 * Setter for <code>blocklyprop.project.modified</code>.
	 */
	public void setModified(GregorianCalendar value) {
		setValue(9, value);
	}

	/**
	 * Getter for <code>blocklyprop.project.modified</code>.
	 */
	public GregorianCalendar getModified() {
		return (GregorianCalendar) getValue(9);
	}

	// -------------------------------------------------------------------------
	// Primary key information
	// -------------------------------------------------------------------------

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Record1<Long> key() {
		return (Record1) super.key();
	}

	// -------------------------------------------------------------------------
	// Record10 type implementation
	// -------------------------------------------------------------------------

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Row10<Long, Integer, String, String, String, Integer, Boolean, Boolean, GregorianCalendar, GregorianCalendar> fieldsRow() {
		return (Row10) super.fieldsRow();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Row10<Long, Integer, String, String, String, Integer, Boolean, Boolean, GregorianCalendar, GregorianCalendar> valuesRow() {
		return (Row10) super.valuesRow();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<Long> field1() {
		return Project.PROJECT.ID;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<Integer> field2() {
		return Project.PROJECT.ID_USER;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<String> field3() {
		return Project.PROJECT.NAME;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<String> field4() {
		return Project.PROJECT.DESCRIPTION;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<String> field5() {
		return Project.PROJECT.CODE;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<Integer> field6() {
		return Project.PROJECT.TYPE;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<Boolean> field7() {
		return Project.PROJECT.PRIVATE;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<Boolean> field8() {
		return Project.PROJECT.SHARED;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<GregorianCalendar> field9() {
		return Project.PROJECT.CREATED;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Field<GregorianCalendar> field10() {
		return Project.PROJECT.MODIFIED;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Long value1() {
		return getId();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Integer value2() {
		return getIdUser();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public String value3() {
		return getName();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public String value4() {
		return getDescription();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public String value5() {
		return getCode();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Integer value6() {
		return getType();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Boolean value7() {
		return getPrivate();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Boolean value8() {
		return getShared();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public GregorianCalendar value9() {
		return getCreated();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public GregorianCalendar value10() {
		return getModified();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectRecord value1(Long value) {
		setId(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectRecord value2(Integer value) {
		setIdUser(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectRecord value3(String value) {
		setName(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectRecord value4(String value) {
		setDescription(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectRecord value5(String value) {
		setCode(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectRecord value6(Integer value) {
		setType(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectRecord value7(Boolean value) {
		setPrivate(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectRecord value8(Boolean value) {
		setShared(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectRecord value9(GregorianCalendar value) {
		setCreated(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectRecord value10(GregorianCalendar value) {
		setModified(value);
		return this;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectRecord values(Long value1, Integer value2, String value3, String value4, String value5, Integer value6, Boolean value7, Boolean value8, GregorianCalendar value9, GregorianCalendar value10) {
		value1(value1);
		value2(value2);
		value3(value3);
		value4(value4);
		value5(value5);
		value6(value6);
		value7(value7);
		value8(value8);
		value9(value9);
		value10(value10);
		return this;
	}

	// -------------------------------------------------------------------------
	// Constructors
	// -------------------------------------------------------------------------

	/**
	 * Create a detached ProjectRecord
	 */
	public ProjectRecord() {
		super(Project.PROJECT);
	}

	/**
	 * Create a detached, initialised ProjectRecord
	 */
	public ProjectRecord(Long id, Integer idUser, String name, String description, String code, Integer type, Boolean private_, Boolean shared, GregorianCalendar created, GregorianCalendar modified) {
		super(Project.PROJECT);

		setValue(0, id);
		setValue(1, idUser);
		setValue(2, name);
		setValue(3, description);
		setValue(4, code);
		setValue(5, type);
		setValue(6, private_);
		setValue(7, shared);
		setValue(8, created);
		setValue(9, modified);
	}
}
